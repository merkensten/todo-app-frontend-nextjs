import React from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

import { getTokenInfo } from '../../utils';

import styles from '../../styles/pages/Konto.module.scss';

function Konto() {
  const router = useRouter();
  const { isUserAuthenticated, getToken, logoutUser } =
    React.useContext(AuthContext);

  // Internal state
  const [userId, setUserId] = React.useState('');
  const [userToken, setUserToken] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [updatedUsername, setUpdatedUsername] = React.useState('');
  const [confirmUsername, setConfirmedUsername] = React.useState('');
  const [formError, setFormError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formScuccess, setFormSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  React.useEffect(() => {
    // checks if the user is authenticated
    if (isUserAuthenticated === false) {
      router.push('/login');
    }

    // Denna logik wrappas i en if sats för att säkerställa att det finns en token för annars uppstår ett error om getTokenInfo inte kommer åt en token.
    if (isUserAuthenticated) {
      const token = getToken();
      const decodedToken = getTokenInfo(token);

      setUserId(decodedToken.user.id);
      setUsername(decodedToken.user.username);
      setUserToken(token);
    }
  }, [router, isUserAuthenticated, getToken]);

  function updateUsername() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    axios({
      method: 'patch',
      url: `${API_URL}/user/${userId}`,
      data: {
        username: confirmUsername,
      },
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          setFormSuccess(true);
          setTimeout(() => {
            setUpdatedUsername('');
            setConfirmedUsername('');
            logoutUser();
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
        setFormError(true);
        setErrorMessage('Något gick fel, försök igen.');
      });
  }

  function onUpdateUsername(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (updatedUsername !== confirmUsername) {
      setFormError(true);
      setErrorMessage('Användarnamnen matchar inte!');
      return;
    }

    updateUsername();
  }

  return (
    <div className={styles.wrapper}>
      <h1>Hantera Konto</h1>
      <p>Användarnamn: {username}</p>
      <form onSubmit={onUpdateUsername}>
        <h2>Uppdatera användarnamn</h2>
        <label>
          Nytt användarnamn:
          <input
            type="text"
            name="användarnamn"
            id="användarnamn"
            placeholder="Nytt användarnamn..."
            onChange={(e) => setUpdatedUsername(e.target.value)}
            value={updatedUsername}
          />
          <input
            type="text"
            name="confirm-användarnamn"
            id="confirm-användarnamn"
            placeholder="Konfirmera användarnamn..."
            onChange={(e) => setConfirmedUsername(e.target.value)}
            value={confirmUsername}
          />
        </label>
        <button className="form-btn btn-primary" type="submit">
          Uppdatera
        </button>
        {formError && <p className="error">{errorMessage}</p>}
        {formScuccess && <p className="success">Användarnamn uppdaterat, du kommer snart att loggas ut!</p>}
      </form>
    </div>
  );
}

export default Konto;
