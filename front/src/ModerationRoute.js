// LIBRARIES
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// CONTEXT
import { loginContext } from './Context/context';

const ModerationRoutes = () => {

  const { status } = useContext(loginContext);

  return status === 'admin' ? <Outlet /> : <Navigate to="/home" />;
};

export default ModerationRoutes;
