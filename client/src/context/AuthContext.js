import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('/api/auth/me', {
            headers: { 'x-auth-token': token }
          });
          setCurrentUser(res.data);
        }
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.token && res.data.user) {
        localStorage.setItem('token', res.data.token);
        setCurrentUser(res.data.user);
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      if (res.data.token && res.data.user) {
        localStorage.setItem('token', res.data.token);
        setCurrentUser(res.data.user);
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
