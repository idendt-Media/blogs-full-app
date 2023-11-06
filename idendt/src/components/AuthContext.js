import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  console.log(token, "ivdidndddd");
  const isAuthenticated = !!token; // Set isAuthenticated based on the presence of the token

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('jwtToken', newToken);



  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
