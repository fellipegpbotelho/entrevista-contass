import React from "react";
import { format } from "date-fns";

function Table({ tasks, handleDelete, handleEdit }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Data</th>
          <th>Usuário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 && (
          <tr>
            <th colSpan="4">Nenhuma tarefa cadastrada 🙁</th>
          </tr>
        )}
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.description}</td>
            <td>{format(task.date, "DD/MM/YYYY")}</td>
            <td>{task.user}</td>
            <td width="300">
              <button
                className="button button-outline"
                onClick={() => handleEdit(task.id)}
              >
                Editar
              </button>
              <button className="button" onClick={() => handleDelete(task.id)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
