// Refaktorisera denna så att den jobbar mot det nya.

// imports
import * as React from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type TodoType = {
  _id: string;
  text: string;
  user: string;
  completed: boolean;
};

// Get Data
const GetTodos = (path: string, token: string, userId: string) => {
  const [todos, setTodos] = React.useState<TodoType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<null | boolean>(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    setLoading(true);

    if (token) {
      axios
        .get(`${API_URL}/${path}/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then(function (response) {
          setTodos(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
          setLoading(false);
        });
    }
  }, [path, token, userId]);

  return { todos, loading, error, errorMessage };
};

export { GetTodos };
