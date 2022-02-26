// LIBRARIES
import { NavLink } from 'react-router-dom';

const MessageName = ({ data }) => {

  const { firstname, lastname, username, profilePicture, messageUserId } = data;

  // on affiche le nom prénom et pseudo de l'utilisateur qui a posté le message
  return (
    <NavLink
      to={`/profile/${messageUserId}`}
      className='names'>
      {firstname} {lastname} ({username})
      <img className='profile-pic' src={profilePicture} alt="avatar de l'utilisateur" />
    </NavLink>
  );

};

export default MessageName;