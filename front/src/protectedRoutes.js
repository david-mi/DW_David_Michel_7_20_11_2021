// LIBRARIES
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// CONTEXT
import { loginContext } from './Context/context';

const ProtectedRoutes = () => {

  const { isLogged } = useContext(loginContext);

  return (
    isLogged === null
      ? null
      : isLogged === false
        ? <Navigate to="/login" />
        : <Outlet />
  );
};

export default ProtectedRoutes;
