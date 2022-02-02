import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import loginContext from '../Context/loginContext';
import axios from 'axios';

const Nav = () => {

  const { isLogged, setIsLogged } = useContext(loginContext);
  const [addPicture, setAddPicture] = useState(false);

  const getProfilePicture = async () => {
    const { USER_ID } = JSON.parse(localStorage.getItem('payload'));
    const res = await axios.get(`http://localhost:3000/api/auth/users/${USER_ID}`);
    const { profilePicture } = res.data;
    setAddPicture(profilePicture);
  };

  const logOut = () => {
    localStorage.removeItem('payload');
    setIsLogged(false);
  };

  // source du souci ?? 
  useEffect(() => {

    if (isLogged) {
      console.log('[useEffect] Nav.js MOUNT');
      getProfilePicture();
    }
    return () => {
      console.log('[useEffect] Nav.js DISMOUNT');
    };
  }, [isLogged]);


  return (

    isLogged
      ? (
        <nav className='header__nav'>
          <NavLink to={'/'}>Accueil</NavLink>
          <button onClick={logOut}>Se déconnecter</button>
          <NavLink to={'/profile'}>
            {addPicture && <img src={addPicture} alt='photo par défault' />}
          </NavLink>
        </nav>
      )

      : (
        <nav className='header__nav'>
          <NavLink to={'/register'}>Inscription</NavLink>
          <NavLink to={'/login'}>Login</NavLink>
        </nav>
      )
  );

};

export default Nav;
