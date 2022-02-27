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

// CONTEXT
import { loginContext } from './Context/context';

// ROUTES
import ProtectedRoutes from './protectedRoutes';
import ModerationRoutes from './ModerationRoute';

// COMPONENTS
import ProfileEmailUpdate from './components/Profile/ProfileEmailUpdate';
import Moderation from './components/Moderation/Moderation';
import ProfilePwUpdate from './components/Profile/ProfilePwUpdate';


const App = () => {

  const [isLogged, setIsLogged] = useState(null);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(null);
  const [USER_ID, setUSER_ID] = useState(null);


  const loggedCheck = () => {

    /* on vérifie si l'utilisateur possède un token stocké dans le localStorage */
    const check = localStorage.getItem('token');

    /* si il en possède un on le parse, on le décode et on regarde si il n'a pas expiré */
    if (check) {
      const getToken = JSON.parse(localStorage.getItem('token'));
      const decodedToken = decodeToken(getToken);
      const isTokenExpired = isExpired(getToken);

      // si le token n'est pas decodable on supprime l'entrée du localStorage et on reset les states
      if (!decodedToken || isTokenExpired) {
        localStorage.clear();
        setIsLogged(false);
        setStatus(null);
        setUSER_ID(null);
      }
      /* si le token à été décode et qu'il n'est pas expiré on mets les informations dans les différents
      states et on passe le state servant à définir si l'utilisateur est connecté à true */
      if (decodedToken && !isTokenExpired) {
        const { USER_ID, status } = decodedToken;
        setStatus(status);
        setToken(getToken);
        setUSER_ID(USER_ID);
        setIsLogged(true);
      }
    }

    // si on ne trouve pas d'entrée token dans le storage on reset les states
    if (!check) {
      setIsLogged(false);
      setStatus(null);
      setUSER_ID(null);
    }
  };

  // useEffect qui va appliquer la fonction loggedCheck en fonction des changements d'états de isLogged
  useEffect(loggedCheck, [isLogged]);

  /* on va appliquer tout en haut de l'application un contexte contenant plusieurs states que l'on pourra
  utiliser ou modifier, on utilisera aussi 2 routes de routes privées, une pour quand l'utilisateur est connecté
  et une autre pour l'administrateur */
  return (
    <loginContext.Provider value={{ isLogged, setIsLogged, token, setToken, USER_ID, status }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route element={<ProtectedRoutes data={{ loggedCheck }} />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
            <Route path="/profile/updatemail" element={<ProfileEmailUpdate />}></Route>
            <Route path="/profile/updatepassword" element={< ProfilePwUpdate />}></Route>
            <Route element={<ModerationRoutes />}>
              <Route path="/moderation-board" element={<Moderation />}></Route>
            </Route>
          </Route>
          <Route path="/" element={<Navigate replace to="/home" />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
};

export default App;
