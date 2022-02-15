// LIBRARIES
import axios from 'axios';
import { useContext } from 'react';

// CONTEXT
import { loginContext, refreshData } from '../../Context/loginContext';

// ICONS
import { LikeIcon } from '../../icons-logos/icons';

const apiMessage = 'http://localhost:3000/api/messages';

function MessagesLikes(props) {

  const { showLikeUsers, setShowLikeUsers, likeList, messageId } = props.data;

  const { token, USER_ID } = useContext(loginContext);

  const { setRefreshToogle } = useContext(refreshData);

  const hasLiked = () => {
    if (!likeList.length) return false;
    return likeList.find(({ User }) => User.userLiked == USER_ID);
  };

  const sendLike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };

    const like = await axios.post(`${apiMessage}/${messageId}/like`, null, { headers });
    console.log(like.data.message);
    setRefreshToogle((e) => !e);
  };

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