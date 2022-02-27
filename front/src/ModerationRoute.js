// LIBRARIES
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// CONTEXT
import { loginContext } from './Context/context';

const ModerationRoutes = () => {

  const { status } = useContext(loginContext);

  /* si l'utilisateur essayant d'accéder à l'onglet d'administration 
  n'a pas le statut admin il sera redirigé sur /home */
  return status === 'admin' ? <Outlet /> : <Navigate to="/home" />;
};

export default ModerationRoutes;
