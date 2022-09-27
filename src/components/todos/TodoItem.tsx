import React from 'react';
import styles from '../../styles/components/todos/Todos.module.scss';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

// components
import UpdateTodo from './UpdateTodo';

type TodoType = {
  _id: string;
  text: string;
  user: string;
  completed: boolean;
  token: string;
  rerenderTodos: () => void;
};
function TodoItem({
  text,
  _id,
  completed,
  user,
  token,
  rerenderTodos,
}: TodoType) {
  const [showUpdateTodo, setShowUpdateTodo] = React.useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  function removeTodoFromServer() {
    axios({
      method: 'delete',
      url: `${API_URL}/todo/${_id}?userId=${user}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        console.log(response);
        rerenderTodos();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function completeTodo() {
    axios({
      method: 'put',
      url: `${API_URL}/todo/${_id}?user=${user}`,
      data: {
        text: text,
        user: user,
        completed: true,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        rerenderTodos();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateTodo() {
    setShowUpdateTodo(!showUpdateTodo);
  }

  function resetTodoToActive() {
    axios({
      method: 'put',
      url: `${API_URL}/todo/${_id}?user=${user}`,
      data: {
        text: text,
        user: user,
        completed: false,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        rerenderTodos();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <div className={styles.todo_item_wrapper}>
        {showUpdateTodo && (
          <>
            <UpdateTodo
              _id={_id}
              user={user}
              completed={completed}
              token={token}
              text={text}
              rerenderTodos={rerenderTodos}
              setShowUpdateTodo={setShowUpdateTodo}
            />
          </>
        )}
        {!showUpdateTodo && (
          <div className={styles.todo_item_content}>
            <p>{text}</p>
            <div className={styles.todo_icons}>
              {!completed && (
                <>
                  <CheckCircleIcon
                    onClick={completeTodo}
                    className={styles.icon}
                  />
                  <PencilSquareIcon
                    onClick={updateTodo}
                    className={styles.icon}
                  />
                </>
              )}
              {completed && (
                <ArrowPathIcon
                  onClick={resetTodoToActive}
                  className={styles.icon}
                />
              )}
              <XCircleIcon
                onClick={removeTodoFromServer}
                className={styles.icon}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TodoItem;
