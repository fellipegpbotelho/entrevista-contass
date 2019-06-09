import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import axios from "axios";

import "./tasks.css";
import "react-toastify/dist/ReactToastify.min.css";

import Form from "./Form";
import Table from "./Table";

const api = axios.create({
  baseURL: "http://localhost:8000/api"
});

export default function Tasks() {
  const [taskId, setTaskId] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchTasks = async () => {
    setLoading(true);

    const response = await api.get("tasks");

    setTasks(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleSubmit() {
    try {
      setLoading(true);

      const dateSplited = date.split("/");
      const dateFormatted = `${dateSplited[2]}-${dateSplited[1]}-${
        dateSplited[0]
      }`;

      await api({
        method: taskId ? "put" : "post",
        url: taskId ? `tasks/${taskId}` : "tasks",
        data: { description, date: dateFormatted, user }
      });

      toast("Tarefa salva 😃");

      fetchTasks();
      setLoading(false);
    } catch (error) {
      setErrors(error.response.data.errors);
      toast.error("Preencha todos os campos para salvar 🙁");
      setLoading(false);
    }
  }

  async function handleEdit(id) {
    setLoading(true);

    const response = await api.get(`tasks/${id}`);
    const { id: taskId, description, date, user } = response.data;

    setUser(user);
    setTaskId(taskId);
    setDescription(description);
    setDate(format(date, "DD/MM/YYYY"));
    setLoading(false);
  }

  async function handleDelete(id) {
    if (confirm("Deseja realmente remover esta tarefa?")) {
      setLoading(true);
      await api.delete(`tasks/${id}`);
      fetchTasks();
      setLoading(false);
      toast("Tarefa excluída 😃");
    }
  }

  function handleReset() {
    setTaskId("");
    setDescription("");
    setDate("");
    setUser("");
  }

  return (
    <div className="container">
      <ToastContainer autoClose={3000} />
      <h2>Tarefas</h2>
      <Form
        id={taskId}
        date={date}
        user={user}
        errors={errors}
        setDate={setDate}
        setUser={setUser}
        loading={loading}
        handleReset={handleReset}
        description={description}
        handleSubmit={handleSubmit}
        setDescription={setDescription}
      />
      <Table
        tasks={tasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
