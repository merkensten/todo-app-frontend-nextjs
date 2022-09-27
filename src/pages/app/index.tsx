import React from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/pages/App.module.scss';

// components
import { Todos } from '../../components/todos';

// Utils
import { getTokenInfo } from '../../utils';

function App() {
  const router = useRouter();
  const { isUserAuthenticated, getToken } = React.useContext(AuthContext);

  const [userId, setUserId] = React.useState('');
  const [userToken, setUserToken] = React.useState('');
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    // checks if the user is authenticated
    if (isUserAuthenticated === false) {
      router.push('/login');
    }

    // Denna if sats körs bara när det finns en autensierad användare
    if (isUserAuthenticated) {
      const token = getToken();
      const decodedToken = getTokenInfo(token);

      setUserId(decodedToken.user.id);
      setUsername(decodedToken.user.username);
      setUserToken(token);
    }
  }, [router, getToken, isUserAuthenticated]);

  return (
    <div className={styles.wrapper}>
      <h1>Hej {username}!</h1>
      <Todos userId={userId} token={userToken} />
    </div>
  );
}

export default App;
