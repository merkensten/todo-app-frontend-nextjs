import React from 'react';

// Saker att göra:
// - Uppdatera typesen i denna fil

type AuthProiverType = {
  children: React.ReactNode;
};

const AuthContext = React.createContext<any>(null);
const { Provider } = AuthContext;

const TOKEN: 'token' = 'token';

const AuthProvider = ({ children }: AuthProiverType) => {
  const [isUserAuthenticated, setIsUserAuthenticated] =
    React.useState<boolean>();

  function setToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  function getToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(TOKEN);

      if (token) {
        return token;
      }

      return null;
    }
  }

  React.useEffect(() => {
    const token = getToken();

    if (token === null) {
      setIsUserAuthenticated(false);
    }

    if (token) {
      setIsUserAuthenticated(true);
    }
  }, []);

  function logoutUser() {
    localStorage.removeItem(TOKEN);
    setIsUserAuthenticated(false);
  }

  return (
    <Provider
      value={{
        setIsUserAuthenticated,
        isUserAuthenticated,
        logoutUser,
        getToken,
        setToken,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
