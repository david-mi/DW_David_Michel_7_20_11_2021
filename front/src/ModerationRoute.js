// LIBRARIES
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

// CONTEXT
import { loginContext } from './Context/loginContext';

// COMPONENT
import Home from './components/Home';


const ModerationRoutes = () => {

  const { status } = useContext(loginContext);

  return (status === 'admin' || status === 'moderator') ? <Outlet /> : <Home path="/home" />;
};

export default ModerationRoutes;
