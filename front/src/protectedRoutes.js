// LIBRARIES
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

// CONTEXT
import { loginContext } from './Context/loginContext';

// COMPONENT
import Login from './components/Login';


const ProtectedRoutes = () => {

  const { isLogged } = useContext(loginContext);

  return isLogged ? <Outlet /> : <Login path="/login" />;
};

export default ProtectedRoutes;
