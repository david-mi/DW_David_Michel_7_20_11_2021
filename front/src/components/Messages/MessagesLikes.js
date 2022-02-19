// LIBRARIES
import axios from 'axios';
import { useContext, useState } from 'react';

// CONTEXT
import { loginContext, refreshData } from '../../Context/loginContext';

// ICONS
import { LikeIcon } from '../../icons-logos/icons';

const apiMessage = 'http://localhost:3000/api/messages';

function MessagesLikes(props) {

  const { likeList, messageId } = props.data;

  const { token, USER_ID } = useContext(loginContext);
  const { setRefreshToogle } = useContext(refreshData);

  // un state gérant l'état de l'affichage des utilisateurs qui ont like le message
  const [showLikeUsers, setShowLikeUsers] = useState(false);

  /* fonction permettant de savoir si l'utilisateur en question à déjà like le message
  pour pouvoir mettre à jour de la couleur du composant LikeIcon */
  const hasLiked = () => {
    if (!likeList.length) return false;
    return likeList.find(({ User }) => User.userMessageVoted == USER_ID);
  };

  const sendLike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };

    await axios.post(`${apiMessage}/${messageId}/like`, null, { headers });
    setRefreshToogle((e) => !e);
  };

  /* au hover sur le nombre de like, si ce nombre est supérieur à 0
  on va afficher le prénom / nom / pseudo des utilisateurs qui ont like le message */
  return (
    <div className='like-container'>
      <span className="like-btn" onClick={sendLike}><LikeIcon hasLiked={hasLiked} /></span>
      <span className='likeNb'
        onMouseOver={() => setShowLikeUsers(true)}
        onMouseLeave={() => setShowLikeUsers(false)}>
        {likeList.length}
      </span>
      {showLikeUsers && likeList.length
        ? (
          <ul className='liked-list'>
            {likeList.map(({ User }, idx) => (
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

export default MessagesLikes;