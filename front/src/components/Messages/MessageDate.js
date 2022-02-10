// FUNCTIONS
import { handleDate } from '../../functions/messageFunctions';

const MessageDate = (props) => {

  const { createdAt, updatedAt } = props.data;

  return (
    <div className='date-container'>
      <i className='postDate'>le {handleDate(createdAt)}</i>
      <i className='updateDate'>Modifié le {handleDate(updatedAt)}</i>
    </div>
  );

};

export default MessageDate;