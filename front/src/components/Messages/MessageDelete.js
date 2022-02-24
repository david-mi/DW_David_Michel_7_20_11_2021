// LIBRARIES
import axios from 'axios';
import { useContext } from 'react';

// CONTEXT
import { loginContext, refreshData } from '../../Context/context';

// LOGOS
import Logo from '../../icons-logos/Logo';

const apiMessage = 'http://localhost:3000/api/messages';
const apiModeration = 'http://localhost:3000/api/mod';

const MessageDelete = (props) => {

  const { setIsDeleting, messageId } = props.data;

  const { token, status } = useContext(loginContext);
  const { setRefreshToogle } = useContext(refreshData);

  /* fonction qui va supprimer le message dans la base de donnée
  qui va aussi lancer un nouvel appel api pour afficher la mise à jour
  un changement d'état sera aussi fait pour retirer la fenêtre de confirmation 
  l'appel api sera différent selon le status de la personne */
  const deleteMessage = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    status === 'moderator' || status === 'admin'
      ? await axios.delete(`${apiModeration}/messages/${messageId}/delete`, { headers })
      : await axios.delete(`${apiMessage}/${messageId}`, { headers });
    setIsDeleting(false);
    setRefreshToogle((e) => !e);
  };

  return (
    <div className='confirm__wrapper'>
      < Logo />
      <div className='confirm__container'>
        <h2>Vous êtes sûr de vouloir supprimer ce message ?</h2>
        <i>cette action est irréversible</i>
        <button className='btn' onClick={deleteMessage}>Oui</button>
        <button className='btn' onClick={() => setIsDeleting(false)}>Annuler</button>
      </div>
    </div >
  );
};

export default MessageDelete;
