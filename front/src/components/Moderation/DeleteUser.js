// LIBRARIES
import axios from 'axios';
import { useState, useContext } from 'react';

// CONTEXT
import { loginContext } from '../../Context/context';

// ICONS
import Logo from '../../icons-logos/Logo';

const adminApi = 'http://localhost:3000/api/mod/admin';

const DeleteUser = ({ data }) => {

  const { setIsDeleting, userId, setToggleUpdate } = data;

  const { token } = useContext(loginContext);
  const [isDeleted, setIsDeleted] = useState(false);

  /* fonction permettant d'envoyer la requête qui va supprimer un utilisateur de
  la base de donnée ainsi que gérer certains states */
  const deleteUser = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.delete(`${adminApi}/users/${userId}/delete`, { headers });
    setIsDeleted(true);
    setToggleUpdate(e => !e);
  };


  return (
    <div className='confirm__wrapper'>
      <Logo />
      {isDeleted
        ? (
          <div className='confirm__container'>
            <h2>Compte supprimé</h2>
            <button className='btn' onClick={() => setIsDeleting(false)}>Continuer</button>
          </div>
        )
        : (
          <div className='confirm__container'>
            <h2>Vous êtes sûr de vouloir supprimer ce compte ?</h2>
            <i>cette action est irréversible</i>
            <button className='btn' onClick={deleteUser}>Oui</button>
            <button className='btn' onClick={() => setIsDeleting(false)}>Annuler</button>
          </div>
        )
      }
    </div >
  );
};

export default DeleteUser;
