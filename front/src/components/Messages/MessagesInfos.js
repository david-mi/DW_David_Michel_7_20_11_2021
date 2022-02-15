// LIBRARIES
import { useState, useContext } from 'react';
import { DeleteIcon, EditIcon } from '../../icons-logos/icons';

// FUNCTIONS 
import { handleDate } from '../../functions/messageFunctions';

// CONTEX
import { loginContext } from '../../Context/loginContext';

// PAGES COMPONENTS & ICONS
import MessagesLikes from './MessagesLikes';
import MessagesImage from './MessagesImage';
import MessageDislike from './MessageDislike';
import MessagesComment from './MessagesComment';
import MessageName from './MessageName';
import MessageDate from './MessageDate';
import MessageDelete from './MessageDelete';
import MessageEdit from './MessageEdit';

const MessagesInfos = (props) => {

  const { USER_ID } = useContext(loginContext);

  const [showLikeUsers, setShowLikeUsers] = useState(false);
  const [showDislikeUsers, setShowDislikeUsers] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { User, Likes, text, attachment, createdAt, updatedAt } = props.data;

  const messageUserId = User.id;
  const messageId = props.data.id;
  const likeList = Likes.filter(elem => elem.isLiked);
  const dislikeList = Likes.filter(elem => !elem.isLiked);

  const ownMessage = () => {

    if (messageUserId == USER_ID) {
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
    <div className={isEditing ? 'editing__card' : 'msg__card'}>
      {isDeleting && <MessageDelete data={{ setIsDeleting, messageId }} />}
      {isEditing
        ? <MessageEdit data={{ setIsEditing, text, attachment, messageId }} />
        : (
          <>
            <MessageName data={{ ...User, messageUserId }} />
            <MessageDate data={{ handleDate, createdAt, updatedAt }} />
            {attachment && <MessagesImage attachment={attachment} />}
            <p className='text'>{text}</p>
            <MessagesLikes data={{ showLikeUsers, setShowLikeUsers, likeList, messageId }} />
            <MessageDislike data={{ showDislikeUsers, setShowDislikeUsers, dislikeList, messageId }} />
            <MessagesComment />
            {ownMessage()}
          </>
        )
      }
    </div>
  );

};

export default MessagesInfos;