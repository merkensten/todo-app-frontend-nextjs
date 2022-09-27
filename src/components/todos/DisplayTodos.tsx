import React from 'react';

import TodoItem from './TodoItem';

type TodoType = {
  _id: string;
  text: string;
  user: string;
  completed: boolean;
};

type Props = {
  todos: TodoType[];
  token: string;
  rerenderTodos: () => void;
};

function DisplayTodos({ todos, token, rerenderTodos }: Props) {
  const [completedTodos, setCompletedTodos] = React.useState<TodoType[]>([]);

  React.useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.completed === true);
    setCompletedTodos(completedTodos);
  }, [todos]);
  return (
    <div>
      <>
        <div>
          <h1>Todos</h1>
          {todos
            .map((todo, index) => {
              if (!todo.completed) {
                return (
                  <TodoItem
                    key={index}
                    text={todo.text}
                    completed={todo.completed}
                    _id={todo._id}
                    user={todo.user}
                    token={token}
                    rerenderTodos={rerenderTodos}
                  />
                );
              }
            })
            .reverse()}
        </div>
        <div>
          <h1>Slutförda Todos</h1>
          {completedTodos
            .map((todo, index) => {
              return (
                <TodoItem
                  key={index}
                  text={todo.text}
                  completed={todo.completed}
                  _id={todo._id}
                  user={todo.user}
                  token={token}
                  rerenderTodos={rerenderTodos}
                />
              );
            })
            .reverse()}
        </div>
      </>
    </div>
  );
}

export default DisplayTodos;
