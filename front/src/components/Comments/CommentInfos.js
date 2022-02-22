// LIBRARIES
import { useState, useContext, useEffect } from 'react';

// CONTEXT
import { loginContext } from '../../Context/loginContext';

// COMPONENTS & ICONS
import CommentName from './CommentName';
import CommentDate from './CommentDate';
import CommentImage from './CommentImage';
import { DeleteIcon } from '../../icons-logos/icons';
import { EditIcon } from '../../icons-logos/icons';
import CommentDelete from './CommentDelete';
import CommentEdit from './CommentEdit';
import CommentLike from './CommentLike';
import CommentDislike from './CommentDislike';

const CommentInfos = ({ comment }) => {

  const { commentId, messageId, User, CommentVotes, text, attachment, createdAt, updatedAt } = comment;
  const commentUserId = User.id;
  const commentUserStatus = User.status;
  console.log(comment);
  console.log('commentUserStatus ' + commentUserStatus);
  const commentLikeList = CommentVotes.filter(elem => elem.isLiked);
  const commentDislikeList = CommentVotes.filter(elem => !elem.isLiked);

  const { USER_ID, status } = useContext(loginContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCommentByAdmin, setIsCommentByAdmin] = useState(false);

  const ownComment = () => {

    if (commentUserId == USER_ID) {
      return (
        <>
          <div className='del-icon__wrapper' onClick={() => setIsDeleting(true)}><DeleteIcon /></div>
          <div className='edit-icon__wrapper' onClick={() => setIsEditing(true)}><EditIcon /></div>
        </>
      );
    }

    if (status === 'admin' || (status === 'moderator' && !isCommentByAdmin)) {
      return <div className='del-icon__wrapper' onClick={() => setIsDeleting(true)}><DeleteIcon /></div>;
    }

    return null;

  };

  useEffect(() => {
    if (commentUserStatus === 'admin') setIsCommentByAdmin(true);
  });

  return (
    <div className={isEditing ? 'editing__card' : 'comment__card'}>
      {isDeleting && <CommentDelete data={{ setIsDeleting, commentId, messageId }} />}
      {isEditing
        ? <CommentEdit data={{ setIsEditing, text, attachment, commentId }} />
        : (
          <>
            <CommentName data={{ ...User, commentUserId }} />
            <CommentDate data={{ createdAt, updatedAt }} />
            {attachment && <CommentImage attachment={attachment} />}
            <p className='text'>{text}</p>
            <CommentLike data={{ commentLikeList, commentId }} />
            <CommentDislike data={{ commentDislikeList, commentId }} />
            {ownComment()}
          </>
        )
      }

    </div>
  );
};

export default CommentInfos;