// LIBRARIES
import { useNavigate } from 'react-router-dom';

const MessageName = (props) => {

  const { firstname, lastname, username, messageUserId } = props.data;

  const navigate = useNavigate();

  return (
    <p
      className='names'
      onClick={() => navigate(`/profile/${messageUserId}`)}>
      {firstname} {lastname} ({username})
    </p>
  );

};

export default MessageName;