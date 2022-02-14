// LIBRARIES
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";

// CONTEXT
import { loginContext } from '../../Context/loginContext';

// ICONS
import Logo from '../../icons-logos/Logo';

const Profile_delete = ({ setIsDeleting }) => {

  const navigate = useNavigate();
  const { isLogged, setIsLogged, token, setToken } = useContext(loginContext);
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteUser = async () => {
    const { USER_ID } = decodeToken(token);
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.delete(`http://localhost:3000/api/auth/users/${USER_ID}`, { headers });
    localStorage.clear();
    setIsDeleted(true);
  };

  const redirect = () => {
    setIsLogged(false);
    setToken(null);
    navigate('/register');
  };

  return (
    <div className='confirm__wrapper'>
      <Logo />
      {isDeleted
        ? (
          <div className='confirm__container'>
            <h2>Compte supprimé</h2>
            <button className='btn' onClick={redirect}>Continuer</button>
          </div>
        )
        : (
          <div className='confirm__container'>
            <h2>Vous êtes sûr de vouloir supprimer votre compte ?</h2>
            <i>cette action est irréversible</i>
            <button className='btn' onClick={deleteUser}>Oui</button>
            <button className='btn' onClick={() => setIsDeleting(false)}>Annuler</button>
          </div>
        )
      }
    </div >
  );
};

export default Profile_delete;
