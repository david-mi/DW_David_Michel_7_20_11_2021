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

const App = () => {


  const [isLogged, setIsLogged] = useState(false);

  const loggedCheck = () => {
    const check = localStorage.getItem('payload');
    if (check) {
      const { token } = JSON.parse(localStorage.getItem('payload'));
      const decodedToken = decodeToken(token);
      const isTokenExpired = isExpired(token);
      console.log('decodedToken : ' + decodedToken);
      console.log('isTokenExpired : ' + isTokenExpired);
      if (!decodedToken || isTokenExpired) {
        localStorage.clear();
        setIsLogged(false);
      }
      if (decodedToken && !isTokenExpired) setIsLogged(true);
    }
    if (!check) setIsLogged(false);
  };

  useEffect(loggedCheck, [isLogged, isExpired]);

  return (
    <loginContext.Provider value={{ isLogged, setIsLogged }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
};

export default App;
