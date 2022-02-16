// LIBRARIES
import { useState, useContext } from 'react';

// CONTEXT
import { loginContext } from '../../Context/loginContext';

// COMPONENTS
import CommentName from './CommentName';
import CommentDate from '../Messages/MessageDate';
import CommentImage from './CommentImage';
import { DeleteIcon } from '../../icons-logos/icons';
import { EditIcon } from '../../icons-logos/icons';
import CommentDelete from './CommentDelete';

const CommentInfos = ({ comment }) => {

  const { commentId, messageId, User, text, attachment, createdAt, updatedAt } = comment;
  const commentUserId = User.id;

  const { USER_ID } = useContext(loginContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const ownComment = () => {

    if (commentUserId == USER_ID) {
      return (
        <>
          <div className='del-icon__wrapper' onClick={() => setIsDeleting(true)}><DeleteIcon /></div>
          <div className='edit-icon__wrapper' onClick={() => setIsEditing(true)}><EditIcon /></div>
        </>
      );
    }
    return null;
  };

  return (
    <div className='comment__card'>
      {isDeleting && <CommentDelete data={{ setIsDeleting, commentId, messageId }} />}
      <CommentName data={{ ...User, commentUserId }} />
      <CommentDate data={{ createdAt, updatedAt }} />
      {attachment && <CommentImage attachment={attachment} />}
      <p className='text'>{text}</p>
      {ownComment()}
    </div>
  );
};

export default CommentInfos;