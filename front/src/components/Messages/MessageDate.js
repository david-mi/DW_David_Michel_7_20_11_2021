// FUNCTIONS
import { handleDate } from '../../functions/messageFunctions';

const MessageDate = (props) => {

  const { createdAt, updatedAt } = props.data;

  /* si la date d'edit est la même que la date de post on ne l'affiche pas */
  return (
    <div className='date-container'>
      <i className='postDate'>le {handleDate(createdAt)}</i>
      {(updatedAt !== createdAt) && (
        <i className='updateDate'>Modifié le {handleDate(updatedAt)}</i>
      )}
    </div>
  );

};

export default MessageDate;