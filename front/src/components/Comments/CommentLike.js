// LIBRARIES
import axios from 'axios';
import { useContext, useState } from 'react';

// CONTEXT
import { loginContext, refreshData } from '../../Context/loginContext';

// ICONS
import { LikeIcon } from '../../icons-logos/icons';

const apiComment = 'http://localhost:3000/api/comments';

function CommentLike(props) {

  const { commentLikeList, commentId } = props.data;

  const { token, USER_ID } = useContext(loginContext);
  const { setRefreshToogle } = useContext(refreshData);

  const [showLikeCommentUsers, setshowLikeCommentUsers] = useState(false);

  const hasLiked = () => {
    if (!commentLikeList.length) return false;
    return commentLikeList.find(({ User }) => User.userCommentVoted == USER_ID);
  };

  const sendLike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };

    const like = await axios.post(`${apiComment}/${commentId}/like`, null, { headers });
    console.log(like.data.message);
    setRefreshToogle((e) => !e);
  };

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
}

export default CommentLike;