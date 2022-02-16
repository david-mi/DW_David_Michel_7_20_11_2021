// LIBRARIES
import axios from 'axios';
import { useContext, useState } from 'react';

// CONTEXT
import { loginContext, refreshData } from '../../Context/loginContext';

// ICONS
import { DislikeIcon } from '../../icons-logos/icons';

const apiComment = 'http://localhost:3000/api/comments';

function CommentDislike(props) {

  const { commentDislikeList, commentId } = props.data;

  const { token, USER_ID } = useContext(loginContext);
  const { setRefreshToogle } = useContext(refreshData);

  const [showDislikeCommentUsers, setshowDislikeCommentUsers] = useState(false);

  const hasDisliked = () => {
    if (!commentDislikeList.length) return false;
    return commentDislikeList.find(({ User }) => User.userCommentVoted == USER_ID);
  };

  const sendDislike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };

    const dislike = await axios.post(`${apiComment}/${commentId}/dislike`, null, { headers });
    console.log(dislike.data.message);
    setRefreshToogle((e) => !e);
  };

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