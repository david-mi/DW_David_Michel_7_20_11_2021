// LIBRARIES
import { Route, Routes, BrowserRouter } from 'react-router-dom';
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

  const loggedCheck = () => {

    const check = localStorage.getItem('payload');

    if (check) {
      const payload = JSON.parse(localStorage.getItem('payload'));
      const decodedToken = decodeToken(payload.token);
      const isTokenExpired = isExpired(payload.token);

      if (!decodedToken || isTokenExpired) {
        localStorage.clear();
        setIsLogged(false);
      }
      if (decodedToken && !isTokenExpired) {
        setIsLogged(true);
        setToken(payload.token);
      }
    }
    if (!check) setIsLogged(false);
  };

  useEffect(() => {
    console.log('loggedCheck');
    loggedCheck();
  }, [isLogged]);

  return (
    <loginContext.Provider value={{ isLogged, setIsLogged, token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/profile/updatemail" element={<Profile_email_update />}></Route>
            <Route path="/profile/updatepassword" element={< ProfilePwUpdate />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
};

export default App;
