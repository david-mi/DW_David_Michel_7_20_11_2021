// LIBRARIES
import { useState } from 'react';

// ICONS
import { MessageIcon } from '../../icons-logos/icons';

const MessagesComment = ({ data }) => {

  const { Comments, setIsShowingComments } = data;

  const [showCommentUsers, setShowCommentsUsers] = useState(null);

  const commentsToggle = () => {
    if (Comments.length) setIsShowingComments(e => !e);
  };

  return (
    <>
      <div className='comment-container'>
        <a className='comment-btn'
          href='#hide-comments'
          onClick={commentsToggle}>
          <MessageIcon />
        </a>
        <span className='commentNb'
          onMouseOver={() => setShowCommentsUsers(true)}
          onMouseLeave={() => setShowCommentsUsers(false)}>
          {Comments.length}
        </span>
        {showCommentUsers && Comments.length
          ? (
            <ul className='comment-list'>
              {Comments.map(({ User }, idx) => (
                <li key={idx}>
                  {User.firstname} {User.lastname} ({User.username})
                </li>
              ))}
            </ul>
          )
          : null
        }
      </div>

    </>
  );

};

export default MessagesComment;