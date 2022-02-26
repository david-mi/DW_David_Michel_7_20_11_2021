// LIBRARIES
import axios from 'axios';
import { useContext, useState } from 'react';

// CONTEXT
import { loginContext, refreshData } from '../../Context/context';

// ICONS
import { LikeIcon } from '../../icons-logos/icons';

// DATA
import { apiComment, getHeaders } from '../../data/apiData';

const CommentLike = ({ data }) => {

  const { commentLikeList, commentId } = data;

  const { token, USER_ID } = useContext(loginContext);
  const { setRefreshToogle } = useContext(refreshData);

  // un state gérant l'état de l'affichage des utilisateurs qui ont like le commentaire
  const [showLikeCommentUsers, setshowLikeCommentUsers] = useState(false);

  /* fonction permettant de savoir si l'utilisateur en question à déjà like le commentaire
  pour pouvoir mettre à jour de la couleur du composant LikeIcon */
  const hasLiked = () => {
    if (!commentLikeList.length) return false;
    return commentLikeList.find(({ User }) => User.userCommentVoted === USER_ID);
  };

  /* fonction qui va envoyer une requête pour envoyer un like ou bien le retirer
  qui va aussi lancer un nouvel appel api pour afficher la mise à jour */
  const sendLike = async () => {
    await axios.post(`${apiComment}/${commentId}/like`, null, getHeaders(token));
    setRefreshToogle((e) => !e);
  };

  /* au hover sur le nombre de like, si ce nombre est supérieur à 0
  on va afficher le prénom / nom / pseudo des utilisateurs qui ont like le commentaire */
  return (
    <div className='like-container'>
      <span className="like-btn" onClick={sendLike}><LikeIcon hasLiked={hasLiked} /></span>
      <span className='likeNb'
        onMouseOver={() => setshowLikeCommentUsers(true)}
        onMouseLeave={() => setshowLikeCommentUsers(false)}>
        {commentLikeList.length}
      </span>
      {showLikeCommentUsers && commentLikeList.length
        ? (
          <ul className='liked-list'>
            {commentLikeList.map(({ User }, idx) => (
              <li key={idx}>
                {User.firstname} {User.lastname} ({User.username})
              </li>
            ))}
          </ul>
        )
        : null
      }
    </div>
  );
};

export default CommentLike;