// LIBRARIES
import { useState } from 'react';
import { DeleteIcon, EditIcon } from '../../icons/icons';

// FUNCTIONS 
import { handleDate } from '../../functions/messageFunctions';

// PAGES COMPONENTS & ICONS
import MessagesLikes from './MessagesLikes';
import MessagesImage from './MessagesImage';
import MessagesComment from './MessagesComment';
import MessageName from './MessageName';
import MessageDate from './MessageDate';

const MessagesInfos = (props) => {

  const [showLikeUsers, setShowLikeUsers] = useState(false);

  const { User, Likes, text, attachment, createdAt, updatedAt } = props.data;
  const { username, firstname, lastname, } = User;
  const messageUserId = User.id;

  const ownMessage = () => {

    const { USER_ID } = JSON.parse(localStorage.getItem('payload'));

    if (messageUserId == USER_ID) {
      return (
        <>
          <DeleteIcon />
          <EditIcon />
        </>
      );
    }
    return null;
  };

  return (
    <div className='msg__card'>
      <MessageName data={{ username, firstname, lastname, messageUserId }} />
      <MessageDate data={{ handleDate, createdAt, updatedAt }} />
      {attachment && <MessagesImage attachment={attachment} />}
      <p className='text'>{text}</p>
      <MessagesLikes data={{ showLikeUsers, setShowLikeUsers, Likes }} />
      <MessagesComment />
      {ownMessage()}
    </div>
  );

};

export default MessagesInfos;