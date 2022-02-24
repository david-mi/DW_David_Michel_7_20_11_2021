// LIBRARIES
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// CONTEXT
import { loginContext, profilPictureUpdate } from '../Context/context';

// ICONS 
import { LogOutIcon, HomeIcon, ModerationPanel } from '../icons-logos/icons';

const Nav = () => {

  const { isLogged, setIsLogged, token, USER_ID, status } = useContext(loginContext);
  const { pictureUpdate } = useContext(profilPictureUpdate);
  const [addPicture, setAddPicture] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const navigate = useNavigate();

  //fonction permettant de récupérer les infos d'un utilisateur pour afficher sa photo de profil
  const getProfilePicture = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    const res = await axios.get(`http://localhost:3000/api/auth/users/${USER_ID}`, { headers });
    const { profilePicture } = res.data;
    setAddPicture(profilePicture);
  };

  /* fonction qui va nettoyer le localStorage, changer le state qui indique 
  si l'utilisateur est connecté ou non et le rediriger sur /login */
  const logOut = () => {
    localStorage.clear();
    setIsLogged(false);
    navigate('/login');
  };

  /* useEffect qui va observer les changements d'état des states isLogged, pictureUpdate et USER_ID
  et va s'occuper d'appeler la fonction getProfilePicture si les conditions sont remplies */
  useEffect(() => {
    setIsMounted(true);
    if (isLogged && isMounted && USER_ID) {
      getProfilePicture();
      console.log('getProfilePicture');
    }
    // console.log('userid ' + USER_ID);
    // console.log('isLogged ' + isLogged);
    // console.log('token ' + token);
    // console.log('ismounted ' + isMounted);
    return () => {
      setIsMounted(false);
      console.log('Nav unmounted');
    };

  }, [isLogged, pictureUpdate, USER_ID]);

  // on va afficher les liens vers des menus selon si l'utilisateur est admin, connecté ou non
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
