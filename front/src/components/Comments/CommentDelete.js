// LIBRARIES
import axios from 'axios';
import { useContext } from 'react';

// CONTEXT
import { loginContext, refreshData } from '../../Context/loginContext';

// LOGOS
import Logo from '../../icons-logos/Logo';

const apiComment = 'http://localhost:3000/api/comments';

const CommentDelete = (props) => {

  const { setIsDeleting, commentId } = props.data;

  const { token } = useContext(loginContext);
  const { setRefreshToogle } = useContext(refreshData);

  const deleteComment = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.delete(`${apiComment}/${commentId}`, { headers });
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
