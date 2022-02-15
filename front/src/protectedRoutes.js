import { useContext } from 'react';

import { Outlet } from 'react-router-dom';

import { loginContext } from './Context/loginContext';

import Login from './components/Login';


const ProtectedRoutes = () => {

  const { isLogged } = useContext(loginContext);
  console.log('protecTed routes');

  return isLogged ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
