// AuthProvider.js
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      console.log(storedToken);
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    console.log(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const refresh = () => {
    const url = 'http://localhost:3000/api/users/bot/insights';

    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setData(response.data);
        console.log('Success:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  return (
    <AuthContext.Provider value={{ data, refresh, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
