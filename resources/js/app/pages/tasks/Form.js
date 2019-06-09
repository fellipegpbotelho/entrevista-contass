import React, { Fragment } from "react";
import Loader from "react-loader-spinner";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

export default function Form({
  description,
  setDescription,
  date,
  setDate,
  user,
  setUser,
  loading,
  handleSubmit,
  handleReset,
  id,
  errors
}) {
  return (
    <Fragment>
      <div className="row">
        <div className="column column-40">
          <label htmlFor="description">Descrição: </label>
          <input
            type="text"
            placeholder="Descrição da tarefa"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            name="description"
          />
          {errors.description && (
            <span class="error-feedback">{errors.description[0]}</span>
          )}
        </div>
        <div className="column column-40">
          <label htmlFor="user">Usuário: </label>
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={({ target }) => setUser(target.value)}
            name="user"
          />
          {errors.user && <span class="error-feedback">{errors.user[0]}</span>}
        </div>
        <div className="column column-20">
          <label htmlFor="date">Data: </label>
          <DatePicker
            onChange={date => setDate(format(date, "DD/MM/YYYY"))}
            dateFormat="DD/MM/YYYY"
            placeholderText="Data da tarefa"
            value={date}
          />
          <br />
          {errors.date && <span class="error-feedback">{errors.date[0]}</span>}
        </div>
      </div>
      <div className="row" style={{ marginTop: 15 }}>
        <div className="column">
          <button className="button" onClick={handleSubmit}>
            Salvar
          </button>
          {id && (
            <button className="button button-outline" onClick={handleReset}>
              Limpar
            </button>
          )}
          <div className="float-right">
            {loading && (
              <Loader type="ThreeDots" color="#9B4DCA" height="40" width="40" />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
