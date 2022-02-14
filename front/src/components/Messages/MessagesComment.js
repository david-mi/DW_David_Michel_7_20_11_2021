// ICONS
import { MessageIcon } from '../../icons-logos/icons';

const MessagesComment = () => {

  return (
    <p className='comment-container'>
      <span className='comment-btn'><MessageIcon /></span>
      <span className='commentNb'>Nb</span>
    </p>
  );

};

export default MessagesComment;