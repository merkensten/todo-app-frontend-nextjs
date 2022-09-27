import React from 'react';
import axios from 'axios';
import styles from '../../styles/components/todos/CreateTodo.module.scss';

type TodoType = {
  _id: string;
  text: string;
  user: string;
  completed: boolean;
};

type Props = {
  userId: string;
  token: string;
  API_URL: string;
  setTodos: any;
};

function CreateTodo({ userId, token, API_URL, setTodos }: Props) {
  const [todoText, setTodoText] = React.useState('');

  function addTodoToServer() {
    axios({
      method: 'post',
      url: `${API_URL}/todo`,
      data: {
        text: todoText,
        user: userId,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        setTodos((prevTodos: TodoType[]) => [
          ...prevTodos,
          {
            text: todoText,
            user: userId,
            completed: false,
            _id: response.data._id,
          },
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function createTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(todoText);
    addTodoToServer();
    setTodoText('');
  }

  return (
    <div className={styles.create_todo_wrapper}>
      <form onSubmit={createTodo}>
        <h2>Skapa ny todo</h2>
        <label>
          Skriv in todo:
          <input
            type="text"
            name="todo"
            id="todo"
            placeholder="todo text..."
            onChange={(e) => setTodoText(e.target.value)}
            value={todoText}
          />
        </label>
        <button className="form-btn btn-primary" type="submit">
          Lägg till todo
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
