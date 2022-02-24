// LIBRARIES
import axios from 'axios';
import { useContext, useState } from 'react';

// CONTEXT
import { loginContext, refreshData } from '../../Context/context';

// ICONS
import { DislikeIcon } from '../../icons-logos/icons';

const apiComment = 'http://localhost:3000/api/comments';

function CommentDislike(props) {

  const { commentDislikeList, commentId } = props.data;

  const { token, USER_ID } = useContext(loginContext);
  const { setRefreshToogle } = useContext(refreshData);

  // un state gérant l'état de l'affichage des utilisateurs qui ont dislike le commentaire
  const [showDislikeCommentUsers, setshowDislikeCommentUsers] = useState(false);

  /* fonction permettant de savoir si l'utilisateur en question à déjà dislike le commentaire
  pour pouvoir mettre à jour de la couleur du composant DislikeIcon */
  const hasDisliked = () => {
    if (!commentDislikeList.length) return false;
    return commentDislikeList.find(({ User }) => User.userCommentVoted === USER_ID);
  };

  /* fonction qui va envoyer une requête pour envoyer un dislike ou bien le retirer
  qui va aussi lancer un nouvel appel api pour afficher la mise à jour */
  const sendDislike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.post(`${apiComment}/${commentId}/dislike`, null, { headers });
    setRefreshToogle((e) => !e);
  };

  /* au hover sur le nombre de dislike, si ce nombre est supérieur à 0
  on va afficher le prénom / nom / pseudo des utilisateurs qui ont dislike le commentaire */
  return (
    <div className='dislike-container'>
      <span className="dislike-btn" onClick={sendDislike}><DislikeIcon hasDisliked={hasDisliked} /></span>
      <span className='dislikeNb'
        onMouseOver={() => setshowDislikeCommentUsers(true)}
        onMouseLeave={() => setshowDislikeCommentUsers(false)}>
        {commentDislikeList.length}
      </span>
      {showDislikeCommentUsers && commentDislikeList.length
        ? (
          <ul className='disliked-list'>
            {commentDislikeList.map(({ User }, idx) => (
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
}

export default CommentDislike;