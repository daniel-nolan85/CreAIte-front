import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentAdmin } from '../requests/auth';

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);

  const { token } = useSelector((state) => state.user) || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      currentAdmin(token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          setOk(false);
          navigate('/login');
        });
    }
  }, [token]);

  return ok ? children : null;
};

export default AdminRoute;
