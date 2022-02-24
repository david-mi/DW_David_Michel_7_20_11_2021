// LIBRARIES
import { useNavigate } from 'react-router-dom';

const CommentName = (props) => {

  const { firstname, lastname, username, profilePicture, commentUserId } = props.data;

  const navigate = useNavigate();

  // on affiche le nom prénom et pseudo de l'utilisateur qui a posté le commentaire
  return (
    <>
      <p
        className='names'
        onClick={() => navigate(`/profile/${commentUserId}`)}>
        {firstname} {lastname} ({username})
        <img className='profile-pic' src={profilePicture} alt="avatar de l'utilisateur" />
      </p>

    </>
  );

};

export default CommentName;