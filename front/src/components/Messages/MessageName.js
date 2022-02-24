// LIBRARIES
import { useNavigate } from 'react-router-dom';

const MessageName = (props) => {

  const { firstname, lastname, username, profilePicture, messageUserId } = props.data;

  const navigate = useNavigate();

  // on affiche le nom prénom et pseudo de l'utilisateur qui a posté le message
  return (
    <>
      <p
        className='names'
        onClick={() => navigate(`/profile/${messageUserId}`)}>
        {firstname} {lastname} ({username})
        <img className='profile-pic' src={profilePicture} alt="avatar de l'utilisateur" />
      </p>
    </>
  );

};

export default MessageName;