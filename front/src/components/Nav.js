// LIBRARIES
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// CONTEXT
import { loginContext, profilPictureUpdate } from '../Context/loginContext';

// ICONS 
import { LogOutIcon, HomeIcon } from '../icons-logos/icons';

const Nav = () => {

  const { isLogged, setIsLogged, token, USER_ID } = useContext(loginContext);
  const { pictureUpdate, setPictureUpdate } = useContext(profilPictureUpdate);
  const [addPicture, setAddPicture] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const getProfilePicture = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    const res = await axios.get(`http://localhost:3000/api/auth/users/${USER_ID}`, { headers });
    const { profilePicture } = res.data;
    console.log(profilePicture);
    setAddPicture(profilePicture);
    setUserId(USER_ID);
  };

  const logOut = () => {
    localStorage.removeItem('payload');
    setIsLogged(false);
    //!  A SURVEILLER SI IL FAUT PAS ATTENDRE QUE SETISLOGGED SOIT BIEN FALSE POUR FAIRE LA REDIRECTION
    navigate('/login');
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
  }, [isLogged, pictureUpdate]);

  return (

    isLogged
      ? (
        <nav className='header__nav'>
          <NavLink to={'/home'}><HomeIcon /></NavLink>
          <button onClick={logOut}><LogOutIcon /></button>
          <NavLink to={`/profile/${userId}`}>
            {addPicture && <img src={addPicture} alt='photo de profil' />}
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
