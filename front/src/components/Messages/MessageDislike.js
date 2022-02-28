// LIBRARIES
import { useContext, useState } from 'react';
import axios from 'axios';

// CONTEXT
import { refreshData, loginContext } from '../../Context/context';

// ICONS
import { DislikeIcon } from '../../icons-logos/icons';

//DATA
import { apiMessage, getHeaders } from '../../data/apiData';

const MessageDislike = ({ data }) => {

  const { dislikeList, messageId } = data;

  const { token, USER_ID } = useContext(loginContext);
  const { setRefreshToogle } = useContext(refreshData);

  // un state gérant l'état de l'affichage des utilisateurs qui ont dislike le message
  const [showDislikeUsers, setShowDislikeUsers] = useState(false);

  /* fonction permettant de savoir si l'utilisateur en question à déjà dislike le message
  pour pouvoir mettre à jour de la couleur du composant DislikeIcon */
  const hasDisliked = () => {
    if (!dislikeList.length) return false;
    return dislikeList.find(({ User }) => User.userMessageVoted === USER_ID);
  };

  /* fonction qui va envoyer une requête pour envoyer un dislike ou bien le retirer
  qui va aussi lancer un nouvel appel api pour afficher la mise à jour */
  const sendDislike = async () => {
    await axios.post(`${apiMessage}/${messageId}/dislike`, null, getHeaders(token));
    setRefreshToogle((e) => !e);
  };

  /* au hover sur le nombre de dislike, si ce nombre est supérieur à 0
  on va afficher le prénom / nom / pseudo des utilisateurs qui ont dislike le message */
  return (
    <div className='dislike-container'>
      <button className='dislike-btn' onClick={sendDislike}><DislikeIcon hasDisliked={hasDisliked} /></button>
      <span className='dislikeNb'
        onMouseOver={() => setShowDislikeUsers(true)}
        onMouseLeave={() => setShowDislikeUsers(false)}>
        {dislikeList.length}
      </span>
      {showDislikeUsers && dislikeList.length
        ? (
          <ul className='disliked-list'>
            {dislikeList.map(({ User }, idx) => (
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

export default MessageDislike;