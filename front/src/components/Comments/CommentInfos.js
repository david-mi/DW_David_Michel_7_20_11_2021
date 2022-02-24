// LIBRARIES
import { useState, useContext, useEffect } from 'react';

// CONTEXT
import { loginContext } from '../../Context/context';

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
  const commentLikeList = CommentVotes.filter(elem => elem.isLiked);
  const commentDislikeList = CommentVotes.filter(elem => !elem.isLiked);

  const { USER_ID, status } = useContext(loginContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCommentByAdmin, setIsCommentByAdmin] = useState(false);

  /* fonction permettant de montrer les boutons d'édition et de suppression d'un commentaire
  selon le status d'un utilisateur */
  const ownComment = () => {

    /* si l'UserId du commentaire affiché correspond à l'USER_ID présent dans notre token, on affiche 
    alors les boutons de suppression et d'édition sur la carte du commentaire */
    if (commentUserId === USER_ID) {
      return (
        <>
          <div className='del-icon__wrapper' onClick={() => setIsDeleting(true)}><DeleteIcon /></div>
          <div className='edit-icon__wrapper' onClick={() => setIsEditing(true)}><EditIcon /></div>
        </>
      );
    }

    /* si le status de l'utilisateur est admin ou alors le status de l'utilisateur est modérateur et que le commentaire
    n'a pas été posté par un admin, on affiche le bouton de suppression sur la carte du commentaire */
    if (status === 'admin' || (status === 'moderator' && !isCommentByAdmin)) {
      return <div className='del-icon__wrapper' onClick={() => setIsDeleting(true)}><DeleteIcon /></div>;
    }

    return null;

  };

  /* useEffect qui va regarder si un message appartient à un admin et va mettre à jour
  le state isMessageByAdmin si c'est le cas */
  useEffect(() => {
    if (commentUserStatus === 'admin') setIsCommentByAdmin(true);
  }, [commentUserStatus]);

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