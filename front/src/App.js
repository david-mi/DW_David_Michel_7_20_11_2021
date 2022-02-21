// LIBRARIES
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isExpired, decodeToken } from "react-jwt";


// PAGES & COMPONENTS
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './pages/NotFound';
import Profile from './components/Profile/Profile';
import Register from './components/Register';

// FILES
import { loginContext } from './Context/loginContext';
import ProtectedRoutes from './protectedRoutes';
import Profile_email_update from './components/Profile/Profile_email_update';
import ProfilePwUpdate from './components/Profile/ProfilePwUpdate';

const App = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [USER_ID, setUSER_ID] = useState(null);
  const [redirectToggle, setRedirectToggle] = useState(false);

  const loggedCheck = () => {

    const check = localStorage.getItem('token');
    console.log('app.js');
    if (check) {
      console.log('check');
      const getToken = JSON.parse(localStorage.getItem('token'));
      const decodedToken = decodeToken(getToken);
      const isTokenExpired = isExpired(getToken);

      if (!decodedToken || isTokenExpired) {
        localStorage.clear();
        setIsLogged(false);
        setIsAdmin(null);
        setUSER_ID(null);
      }
      if (decodedToken && !isTokenExpired) {
        const { USER_ID, isAdmin } = decodedToken;
        console.log('userid ' + USER_ID);
        setIsAdmin(isAdmin);
        setToken(getToken);
        setUSER_ID(USER_ID);
        setIsLogged(true);
      }
    }
    if (!check) {
      setIsLogged(false);
      setIsAdmin(null);
      setUSER_ID(null);
    }
  };

  useEffect(() => {
    console.log('loggedCheck');
    loggedCheck();
  }, [isLogged]);

  return (
    <loginContext.Provider value={{ isLogged, setIsLogged, token, setToken, USER_ID, isAdmin }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
            <Route path="/profile/updatemail" element={<Profile_email_update />}></Route>
            <Route path="/profile/updatepassword" element={< ProfilePwUpdate />}></Route>
          </Route>
          <Route path="/" element={<Navigate replace to="/home" />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
};

export default App;
