// LIBRARIES
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';

// CONTEXT
import { loginContext } from '../../Context/context';

// ICONS
import Logo from '../../icons-logos/Logo';

const adminApi = 'http://localhost:3000/api/mod/admin';

const ChangeStatus = ({ data }) => {

  const { setIsUpdating, userId, setToggleUpdate, userStatus } = data;

  const { token } = useContext(loginContext);
  const [isChanged, setIsChanged] = useState(false);
  const [endpoint, setEndpoint] = useState(null);

  /* fonction permettant d'envoyer la requête qui va changer le status d'un 
  utilisateur dans la base de donnée ainsi que gérer certains states */
  const handleStatus = async (target) => {
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.post(`${adminApi}/users/${userId}/${target}`, null, { headers });
    setIsChanged(true);
    setToggleUpdate(e => !e);
  };

  /* useEffect qui va modifier le state contenant l'endpoint de la requête api selon le status
  actuel de l'utilisateur ciblé */
  useEffect(() => {
    userStatus === 'moderator'
      ? setEndpoint('removemod')
      : setEndpoint('setmod');
  }, [userStatus]);

  return (
    <div className='confirm__wrapper'>
      <Logo />
      {isChanged
        ? (
          <div className='confirm__container'>
            <h2>Status changé</h2>
            <button className='btn' onClick={() => setIsUpdating(false)}>Continuer</button>
          </div>
        )
        : (
          <div className='confirm__container'>
            {userStatus === 'user'
              ? <h2>Vous êtes sûr de vouloir nommer cet utilisateur modérateur ?</h2>
              : <h2>Vous êtes sûr de vouloir retirer le status modérateur à cet utilisateur ?</h2>
            }
            <button className='btn' onClick={() => handleStatus(endpoint)}>Oui</button>
            <button className='btn' onClick={() => setIsUpdating(false)}>Annuler</button>
          </div>
        )

      }
    </div >
  );
};

export default ChangeStatus;
