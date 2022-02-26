// LIBRARIES
import { NavLink } from 'react-router-dom';

const CommentName = ({ data }) => {

  const { firstname, lastname, username, profilePicture, commentUserId } = data;

  // on affiche le nom prénom et pseudo de l'utilisateur qui a posté le commentaire
  return (
    <NavLink
      to={`/profile/${commentUserId}`}
      className='names'>
      {firstname} {lastname} ({username})
      <img className='profile-pic' src={profilePicture} alt="avatar de l'utilisateur" />
    </NavLink>
  );

};

export default CommentName;