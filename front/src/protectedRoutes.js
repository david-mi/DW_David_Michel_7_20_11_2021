// LIBRARIES
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// CONTEXT
import { loginContext } from './Context/context';

const ProtectedRoutes = () => {

  const { isLogged } = useContext(loginContext);

  /* si isLogged est null on retourne null, si il est false, on redirige vers /login si c'est true
  on donne accès aux routes protégées */

  return (
    isLogged === null
      ? null
      : isLogged === false
        ? <Navigate to="/login" />
        : <Outlet />
  );
};

export default ProtectedRoutes;
