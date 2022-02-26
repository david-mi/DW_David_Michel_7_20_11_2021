// FUNCTIONS
import { handleCommentDate } from '../../functions/messageFunctions';

const CommentDate = ({ data }) => {

  const { createdAt, updatedAt } = data;

  /* si la date d'edit est la même que la date de post on ne l'affiche pas */
  return (
    <div className='date-container'>
      <i className='postDate'>{handleCommentDate(createdAt)}</i>
      {(updatedAt !== createdAt) && (
        <i className='updateDate'>edit {handleCommentDate(updatedAt)}</i>
      )}
    </div>
  );

};

export default CommentDate;