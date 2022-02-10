import React from 'react';

import { LogOutIcon, MessageIcon, LikeIcon, HomeIcon, DeleteIcon, EditIcon } from '../../icons/icons';

const MessagesInfos = (props) => {

  const { User, Likes } = props.data;
  const { text, attachment, createdAt, updatedAt } = props.data;
  const { username, firstname, lastname, } = User;

  console.log(props.data);

  const handleDate = (date) => {

    const formatDate = new Date(date);

    const options = {
      // weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: "numeric",
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    return formatDate.toLocaleString('fr-FR', options);

  };

  return (

    <div className='msg__card'>
      <p className='names'>{firstname} {lastname} ({username})</p>
      <div className='date-container'>
        <i className='postDate'>le {handleDate(createdAt)}</i>
        <i className='updateDate'>edit {handleDate(updatedAt)}</i>
      </div>

      {attachment &&
        <div className='msg__img-container'>
          <img className='msg__img' src={attachment} alt="attachment" />
        </div>}
      <p className='text'>{text}</p>
      <p className='like-container'>
        <p className='like-btn'><LikeIcon /></p>
        <p className='likeNb'>{Likes.length}</p>
      </p>
      <p className='comment-container'>
        <p className='comment-btn'><MessageIcon /></p>
        <p className='commentNb'>Nb</p>
      </p>

    </div>

  );

};

export default MessagesInfos;