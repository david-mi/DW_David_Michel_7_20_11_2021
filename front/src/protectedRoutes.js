// LIBRARIES
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// CONTEXT
import { loginContext } from './Context/loginContext';

import Login from './components/Login';

const ProtectedRoutes = () => {

  const { isLogged } = useContext(loginContext);

  console.log('isLogged protected routes' + isLogged);

  return isLogged === null
    ? null : isLogged === false
      ? <Navigate to="/login" />
      : <Outlet />;

  // return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
