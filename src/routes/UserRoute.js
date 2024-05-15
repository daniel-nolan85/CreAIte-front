import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default UserRoute;
