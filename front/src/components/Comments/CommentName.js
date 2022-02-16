// LIBRARIES
import { useNavigate } from 'react-router-dom';

const CommentName = (props) => {

  const { firstname, lastname, username, profilePicture, commentUserId } = props.data;

  const navigate = useNavigate();

  return (
    <>
      <p
        className='names'
        onClick={() => navigate(`/profile/${commentUserId}`)}>
        {firstname} {lastname} ({username})
        <img className='profile-pic' src={profilePicture} />
      </p>

    </>
  );

};

export default CommentName;