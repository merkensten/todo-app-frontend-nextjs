import React from 'react';
import CreateTodo from './CreateTodo';
import DisplayTodos from './DisplayTodos';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/components/todos/Todos.module.scss';

type TodoType = {
  _id: string;
  text: string;
  user: string;
  completed: boolean;
};

type Props = {
  userId: string;
  token: string;
};

function Todos({ userId, token }: Props) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  const [todos, setTodos] = React.useState<TodoType[]>([]);
  const [rerender, setRerender] = React.useState<boolean>(false);
  const { logoutUser } = React.useContext(AuthContext);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [error, setError] = React.useState(false);

  function rerenderTodos() {
    setRerender((prevState: boolean) => !prevState);
  }

  React.useEffect(() => {
    function getTodos() {
      if (userId) {
        axios
          .get(`${API_URL}/todo/${userId}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(function (response) {
            setTodos(response.data);
          })
          .catch(function (error) {
            const status = error.response.status;

            if (status === 401) {
              logoutUser();
            }
          })
          .then(function () {
            // always executed
          });
      }
    }

    getTodos();
  }, [token, userId, API_URL, rerender, logoutUser]);

  return (
    <div className={styles.todo_wrapper}>
      <CreateTodo
        userId={userId}
        token={token}
        API_URL={API_URL}
        setTodos={setTodos}
      />
      <DisplayTodos todos={todos} token={token} rerenderTodos={rerenderTodos} />
    </div>
  );
}

export default Todos;
