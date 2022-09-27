import React from 'react';
import axios from 'axios';

import styles from '../../styles/components/todos/UpdateTodo.module.scss';

type Props = {
  _id: string;
  user: string;
  completed: boolean;
  token: string;
  text: string;
  rerenderTodos: () => void;
  setShowUpdateTodo: (value: React.SetStateAction<boolean>) => void;
};

function UpdateTodo({
  _id,
  user,
  completed,
  token,
  text,
  rerenderTodos,
  setShowUpdateTodo,
}: Props) {
  const [todoText, setTodoText] = React.useState(text);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  function formHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(todoText);

    axios({
      method: 'put',
      url: `${API_URL}/todo/${_id}?user=${user}`,
      data: {
        text: todoText,
        user,
        completed,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        rerenderTodos();
        setShowUpdateTodo(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className={styles.wrapper}>
      <p>Uppdatera todo</p>
      <form onSubmit={formHandler}>
        <input
          type="text"
          name="update-todo"
          id="update-todo"
          onChange={(e) => setTodoText(e.target.value)}
          value={todoText}
          className="update-todo-input"
          placeholder="Skriv in ny todo text..."
        />
        <button type="submit" className="btn-primary">
          Uppdatera todo
        </button>
      </form>
    </div>
  );
}

export default UpdateTodo;
