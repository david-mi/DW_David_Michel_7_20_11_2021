// LIBRARIES
import { useNavigate } from 'react-router-dom';

const MessageName = (props) => {

  const { firstname, lastname, username, profilePicture, messageUserId } = props.data;

  const navigate = useNavigate();

  return (
    <>
      <p
        className='names'
        onClick={() => navigate(`/profile/${messageUserId}`)}>
        {firstname} {lastname} ({username})
        <img className='profile-pic' src={profilePicture} alt="photo de profil de l'utilisateur" />
      </p>
    </>
  );

};

export default MessageName;