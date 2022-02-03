// LIBRARIES
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
    console.log("check si authentifié");
    check ? setIsLogged(true) : setIsLogged(false);
  };

  useEffect(loggedCheck, [isLogged]);

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
