// LIBRARIES
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// CONTEXT
import { loginContext, profilPictureUpdate } from '../Context/loginContext';

// ICONS 
import { LogOutIcon, HomeIcon, ModerationPanel } from '../icons-logos/icons';

const Nav = () => {

  const { isLogged, setIsLogged, token, USER_ID, status } = useContext(loginContext);
  const { pictureUpdate, setPictureUpdate } = useContext(profilPictureUpdate);
  const [addPicture, setAddPicture] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isMounted, setIsMounted] = useState(true);
  const navigate = useNavigate();

  const getProfilePicture = async () => {
    console.log(USER_ID, token);
    const headers = { 'Authorization': `Bearer ${token}` };
    const res = await axios.get(`http://localhost:3000/api/auth/users/${USER_ID}`, { headers });
    const { profilePicture } = res.data;
    setAddPicture(profilePicture);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    //!  A SURVEILLER SI IL FAUT PAS ATTENDRE QUE SETISLOGGED SOIT BIEN FALSE POUR FAIRE LA REDIRECTION
    navigate('/login');
  };

  // source du souci ?? 
  useEffect(() => {
    if (isLogged && isMounted && USER_ID) getProfilePicture();
    console.log('userid ' + USER_ID);
    console.log('isLogged ' + isLogged);
    console.log('token ' + token);
    console.log('ismounted ' + isMounted);
    return () => {
      setIsMounted(false);
      console.log('Nav unmounted');
    };

  }, [isLogged, pictureUpdate, USER_ID]);

  return (

    isLogged
      ? (
        <nav className='header__nav'>
          {status === 'admin' && <NavLink to={'/moderation-board'}><ModerationPanel /></NavLink>}
          <NavLink to={'/home'}><HomeIcon /></NavLink>
          <button onClick={logOut}><LogOutIcon /></button>
          <NavLink to={`/profile/${USER_ID}`}>
            {addPicture && <img src={addPicture} alt='photo de profil' />}
          </NavLink>
        </nav>
      )
      : (
        <nav className='header__nav'>
          <NavLink to={'/register'} className='register-link'>Inscription</NavLink>
          <NavLink to={'/login'} className='login-link'>Login</NavLink>
        </nav>
      )
  );

};

export default Nav;
