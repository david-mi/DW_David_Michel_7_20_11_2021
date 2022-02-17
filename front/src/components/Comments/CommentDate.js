// FUNCTIONS
import { handleCommentDate } from '../../functions/messageFunctions';

const CommentDate = (props) => {

  const { createdAt, updatedAt } = props.data;

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