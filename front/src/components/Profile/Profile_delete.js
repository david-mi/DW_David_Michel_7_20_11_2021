// LIBRARIES
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";

// CONTEXT
import { loginContext } from '../../Context/loginContext';


const Profile_delete = ({ setIsDeleting }) => {

  const navigate = useNavigate();
  const { isLogged, setIsLogged, token, setToken } = useContext(loginContext);
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteUser = async () => {
    const { USER_ID } = decodeToken(token);
    const headers = { 'Authorization': `Bearer ${token}` };
    const deleted = await axios.delete(`http://localhost:3000/api/auth/users/${USER_ID}`, { headers });
    localStorage.clear();
    setIsDeleted(true);
  };

  const redirect = () => {
    setIsLogged(false);
    setToken(null);
    navigate('/register');
  };

  return (
    <div className='delete-user__wrapper'>
      {isDeleted
        ? (
          <div className='confirmation-delete'>
            <h2 className='confirmation-delete__title'>Compte supprimé</h2>
            <button className='confirmation-delete__abort-btn' onClick={redirect}>Continuer</button>
          </div>
        )
        : (
          <div className='delete-user'>
            <h2 className='delete-user__title'>Vous êtes sûr de vouloir supprimer votre compte ?</h2>
            <i className='delete-user__info'>cette action est irréversible</i>
            <button className='delete-user__confirm-btn' onClick={deleteUser}>Oui</button>
            <button className='delete-user__abort-btn' onClick={() => setIsDeleting(false)}>Annuler</button>
          </div>
        )
      }
    </div >
  );
};

export default Profile_delete;
