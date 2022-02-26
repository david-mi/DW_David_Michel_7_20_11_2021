// LIBRARIES
import axios from 'axios';
import { useContext } from 'react';

// CONTEXT
import { loginContext, refreshData } from '../../Context/context';

// LOGOS
import Logo from '../../icons-logos/Logo';

//DATA
import { apiComment, apiModeration, getHeaders } from '../../data/apiData';

const CommentDelete = ({ data }) => {

  const { setIsDeleting, commentId } = data;

  const { token, status } = useContext(loginContext);
  const { setRefreshToogle } = useContext(refreshData);

  /* fonction qui va supprimer le commentaire dans la base de donnée
  qui va aussi lancer un nouvel appel api pour afficher la mise à jour
  un changement d'état sera aussi fait pour retirer la fenêtre de 
  l'appel api sera différent selon le status de la personne */
  const deleteComment = async () => {
    status === 'moderator' || status === 'admin'
      ? await axios.delete(`${apiModeration}/comments/${commentId}/delete`, getHeaders(token))
      : await axios.delete(`${apiComment}/${commentId}`, getHeaders(token));
    setIsDeleting(false);
    setRefreshToogle((e) => !e);
  };

  return (
    <div className='confirm__wrapper'>
      < Logo />
      <div className='confirm__container'>
        <h2>Vous êtes sûr de vouloir supprimer ce commentaire ?</h2>
        <i>cette action est irréversible</i>
        <button className='btn' onClick={deleteComment}>Oui</button>
        <button className='btn' onClick={() => setIsDeleting(false)}>Annuler</button>
      </div>
    </div >
  );
};

export default CommentDelete;
