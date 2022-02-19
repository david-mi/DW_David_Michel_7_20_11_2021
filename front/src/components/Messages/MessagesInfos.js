// LIBRARIES
import { useState, useContext } from 'react';
import { DeleteIcon, EditIcon, UpArrow } from '../../icons-logos/icons';
import { animateScroll as scroll } from 'react-scroll';

// CONTEX
import { loginContext } from '../../Context/loginContext';

// PAGES COMPONENTS & ICONS
import MessagesLikes from './MessagesLikes';
import MessagesImage from './MessagesImage';
import MessageDislike from './MessageDislike';
import MessagesComment from './MessagesComment';
import MessageName from './MessageName';
import MessageDate from './MessageDate';
import MessageDelete from './MessageDelete';
import MessageEdit from './MessageEdit';
import CommentInfos from '../Comments/CommentInfos';
import CommentPost from '../Comments/CommentPost';

const MessagesInfos = (props) => {

  const { USER_ID } = useContext(loginContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isShowingComments, setIsShowingComments] = useState(false);
  const [isClosingComments, setIsClosingComments] = useState(false);

  const { User, MessageVotes, Comments, text, attachment, createdAt, updatedAt } = props.data;

  const messageUserId = User.id;
  const messageId = props.data.id;
  const likeList = MessageVotes.filter(elem => elem.isLiked);
  const dislikeList = MessageVotes.filter(elem => !elem.isLiked);

  const ownMessage = () => {

    if (messageUserId == USER_ID) {
      return (
        <>
          <div className='del-icon__wrapper' onClick={() => setIsDeleting(true)}><DeleteIcon /></div>
          <div className='edit-icon__wrapper' onClick={() => setIsEditing(true)}><EditIcon /></div>
        </>
      );
    }
    return null;
  };

  const handleClosing = (e) => {

    scrollClosingHandle();
    setIsClosingComments(true);
    setTimeout(() => {
      setIsShowingComments(false);
      setIsClosingComments(false);
    }, 800);

  };

  const animDuration = () => Comments.length * 100 + 500;

  const scrollClosingHandle = () => {

    const msgContainer = document.getElementById(`msg-card${messageId}`);

    const boundingMsg = msgContainer.getBoundingClientRect();

    const msgHeight = boundingMsg.height;

    const msgTop = boundingMsg.top;
    const realMsgTop = msgTop + window.scrollY;
    const clientHeight = window.innerHeight;
    const difference = clientHeight - msgHeight;

    console.table({ msgTop, realMsgTop, clientHeight, difference });


    scroll.scrollTo(realMsgTop - difference, {
      duration: animDuration() + 50,
      smooth: 'easeInOutCubic'
    });

  };

  return (
    <>
      {isDeleting && <MessageDelete data={{ setIsDeleting, messageId }} />}
      <div className={isEditing ? 'editing__card' : 'msg__card'} id={`msg-card${messageId}`}>

        {isEditing
          ? <MessageEdit data={{ setIsEditing, text, attachment, messageId }} />
          : (
            <>
              <MessageName data={{ ...User, messageUserId }} />
              <MessageDate data={{ createdAt, updatedAt }} />
              {attachment && <MessagesImage attachment={attachment} />}
              <p className='text'>{text}</p>
              <MessagesLikes data={{ likeList, messageId }} />
              <MessageDislike data={{ dislikeList, messageId }} />
              <MessagesComment data={{ Comments, isShowingComments, setIsShowingComments, messageId, animDuration }} />
              {ownMessage()}
            </>
          )
        }
      </div>
      {isShowingComments && (
        <div className='comments__wrapper' id={`${messageId}wrap`}>
          <div className={`comments-container ${isClosingComments ? 'closing' : 'opening'}`} style={{ animationDuration: `${animDuration()}ms` }}>
            {Comments
              .sort((prev, next) => prev.commentId - next.commentId)
              .map((comment, idx) => <CommentInfos comment={comment} key={idx} />)}
            <CommentPost messageId={messageId} />
            <a className='up-icon' id={`hide-comments${messageId}`} onClick={handleClosing}><UpArrow /></a>
          </div>
        </div>
      )}

    </>
  );

};

export default MessagesInfos;