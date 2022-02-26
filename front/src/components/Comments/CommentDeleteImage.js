// LIBRARIES
import axios from 'axios';
import { useContext } from 'react';

// CONTEXT
import { refreshData, loginContext } from '../../Context/context';
import Logo from '../../icons-logos/Logo';

//DATA
import { apiComment, getHeaders } from '../../data/apiData';

const MessageDeleteImage = ({ data }) => {

  const { setIsDeletingImg, commentId } = data;
  const { setRefreshToogle } = useContext(refreshData);
  const { token } = useContext(loginContext);

  /* fonction pour supprimer une image associée à un message
  qui va aussi lancer un nouvel appel api pour afficher la mise à jour 
  un changement d'état sera aussi fait pour retirer la fenêtre de confirmation */
  const deleteImage = async () => {
    await axios.delete(`${apiComment}/${commentId}/delimg`, getHeaders(token));
    setIsDeletingImg(false);
    setRefreshToogle((e) => !e);
  };

  return (
    <div className='confirm__wrapper'>
      <Logo />
      <div className='confirm__container'>
        <h2 className='delete-message-img__title'>La photo / gif de votre message sera supprimé(e)</h2>
        <button type="button" className='confirm-btn btn' onClick={(e) => deleteImage(e)}>Confirmer</button>
        <button type="button" className='abort-btn btn' onClick={() => setIsDeletingImg(false)}>Annuler</button>
      </div>
    </div >
  );
};

export default MessageDeleteImage;
