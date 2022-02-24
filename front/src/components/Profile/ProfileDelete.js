// LIBRARIES
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// CONTEXT
import { loginContext } from '../../Context/context';

// ICONS
import Logo from '../../icons-logos/Logo';

const ProfileDelete = ({ setIsDeleting }) => {

  const navigate = useNavigate();
  const { setIsLogged, token, setToken, USER_ID } = useContext(loginContext);
  const [isDeleted, setIsDeleted] = useState(false);

  /* fonction qui va s'occuper de faire la requête permettant de supprimer un utilisateur 
  de la base de donnée, nettoyer le localStorage et de changer le state de suppression*/
  const deleteUser = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.delete(`http://localhost:3000/api/auth/users/${USER_ID}`, { headers });
    localStorage.clear();
    setIsDeleted(true);
  };

  /* fonction permettant de reset l'état des states, dont celui qui va indiquer 
  que l'utilisateur est maintenant. L'utilisateur sera redirigé sur la page register */
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

export default ProfileDelete;
