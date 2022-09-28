import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';

import styles from '../styles/pages/Registrera.module.scss';

function Registrera() {
  const router = useRouter();
  const { isUserAuthenticated } = React.useContext(AuthContext);

  React.useEffect(() => {
    // checks if the user is authenticated
    if (isUserAuthenticated === true) {
      router.push('/app');
    }
  }, [router, isUserAuthenticated]);

  // Lokalt state
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [formError, setFormError] = React.useState(false);
  const [formErrorMessage, setFormErrorMessage] = React.useState('');
  const [formSucess, setFormSucess] = React.useState(false);

  function clearFormFields() {
    setUsername('');
    setPassword('');
  }

  function formSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 6) {
      setFormError(true);
      setFormErrorMessage('Lösenordet behöver vara minst 6 tecken långt');
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    axios
      .post(`${API_URL}/auth/register`, {
        username,
        password,
      })
      .then(function (response) {
        console.log(response);
        setFormSucess(true);
        clearFormFields();
        setTimeout(() => {
          router.push('/logga-in');
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <Head>
        <title>Registrera konto</title>
        <meta name="description" content="Registrera konto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.signup_wrapper}>
        <form onSubmit={formSubmit}>
          <h2>Registrera konto</h2>
          <label>
            Användarnamn:
            <input
              type="text"
              name="användarnamn"
              id="användarnamn"
              placeholder="användarnamn..."
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Lösenord:
            <input
              type="password"
              name="lösenord"
              id="lösenord"
              placeholder="lösenord..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="submit" className="btn-primary form-btn">
            {formSucess ? 'Registrering lyckades' : 'Registrera'}
          </button>

          {formError && (
            <div>
              <p className="error">{formErrorMessage}</p>
            </div>
          )}
          {formSucess && (
            <div>
              <p>
                Registrering lyckades! Du kommer snart navigeras till login
                sidan.
              </p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default Registrera;
