// LIBRARIES
import { useState, useContext, useEffect, useRef } from 'react';
import { DeleteIcon, EditIcon, UpArrow } from '../../icons-logos/icons';
import { animateScroll as scroll } from 'react-scroll';

// CONTEX
import { loginContext } from '../../Context/context';

// PAGES COMPONENTS & ICONS
import MessagesLikes from './MessageLikes';
import MessagesImage from './MessageImage';
import MessageDislike from './MessageDislike';
import MessagesComment from './MessageComment';
import MessageName from './MessageName';
import MessageDate from './MessageDate';
import MessageDelete from './MessageDelete';
import MessageEdit from './MessageEdit';
import CommentInfos from '../Comments/CommentInfos';
import CommentPost from '../Comments/CommentPost';

const MessagesInfos = ({ data }) => {

  const { User, MessageVotes, Comments, text, attachment, createdAt, updatedAt } = data;

  const messageUserId = User.id;
  const messageId = data.id;
  const likeList = MessageVotes.filter(elem => elem.isLiked);
  const dislikeList = MessageVotes.filter(elem => !elem.isLiked);
  const messageUserStatus = User.status;

  const { USER_ID, status } = useContext(loginContext);
  const msgContainerRef = useRef(null);
  const cmtContainerRef = useRef(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isShowingComments, setIsShowingComments] = useState(false);
  const [isClosingComments, setIsClosingComments] = useState(false);
  const [isMessageByAdmin, setIsMessageByAdmin] = useState(false);

  /* fonction permettant de montrer les boutons d'édition et de suppression d'un message 
  selon le status d'un utilisateur */
  const ownMessage = () => {

    /* si l'UserId du message affiché correspond à l'USER_ID présent dans notre token, on affiche 
    alors les boutons de suppression et d'édition sur la carte du message */
    if (messageUserId === USER_ID) {
      return (
        <>
          <div className='del-icon__wrapper' onClick={() => setIsDeleting(true)}><DeleteIcon /></div>
          <div className='edit-icon__wrapper' onClick={() => setIsEditing(true)}><EditIcon /></div>
        </>
      );
    }

    /* si le status de l'utilisateur est admin ou alors le status de l'utilisateur est modérateur et que le message
    n'a pas été posté par un admin, on affiche le bouton de suppression sur la carte du message */
    if (status === 'admin' || (status === 'moderator' && !isMessageByAdmin)) {
      return <div className='del-icon__wrapper' onClick={() => setIsDeleting(true)}><DeleteIcon /></div>;
    }

    return null;

  };

  /* useEffect qui va regarder si un message appartient à un admin et va mettre à jour
 le state isMessageByAdmin si c'est le cas */
  useEffect(() => {
    if (messageUserStatus === 'admin') setIsMessageByAdmin(true);
  }, [messageUserStatus]);

  /* fonction qui va gérer le temps d'animation et de scrolling selon le nombre de
  de commentaires affichés */
  const animDuration = () => Comments.length * 30 + 400;

  /* fonction qui va calculer selons certaines positions et tailles la distance parcourue lors
  de l'animation de scrolling à la fermeture des commentaires */
  const scrollClosingHandle = () => {

    const boundingMsg = msgContainerRef.current.getBoundingClientRect();
    const msgHeight = boundingMsg.height;

    const msgTop = boundingMsg.top;
    const realMsgTop = msgTop + window.scrollY;
    const clientHeight = window.innerHeight;
    const difference = clientHeight - msgHeight;

    scroll.scrollTo(realMsgTop - difference, {
      duration: animDuration() + 50,
      smooth: 'easeInOutCubic'
    });

  };

  /* fonction permettant de gérer l'animation au clic sur le bouton de fermeture 
  des commentaires. On va changer le state, appeler la fonction s'occupant du scrolling
  et mettre un setTimeout pour laisser le temps à l'animation css de se faire avant de supprimer
  l'élément du DOM */
  const handleClosing = () => {

    scrollClosingHandle();
    setIsClosingComments(true);

    setTimeout(() => {
      setIsShowingComments(false);
      setIsClosingComments(false);
    }, animDuration());

  };

  return (
    <>
      {isDeleting && <MessageDelete data={{ setIsDeleting, messageId }} />}
      <div className={isEditing ? 'editing__card' : 'msg__card'} ref={msgContainerRef}>
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
              <MessagesComment data={{ Comments, isShowingComments, setIsShowingComments, animDuration, cmtContainerRef }} />
              {ownMessage()}
            </>
          )
        }
      </div>
      {
        isShowingComments && (
          <div className='comments__wrapper' ref={cmtContainerRef}>
            <div className={`comments-container ${isClosingComments ? 'closing' : 'opening'}`} style={{ animationDuration: `${animDuration()}ms` }}>
              {Comments
                .sort((prev, next) => prev.commentId - next.commentId)
                .map((comment, idx) => <CommentInfos comment={comment} key={idx} />)}
              <CommentPost messageId={messageId} />
              <button className='up-icon' id={`hide-comments${messageId}`} onClick={handleClosing}><UpArrow /></button>
            </div>
          </div>
        )
      }

    </>
  );

};

export default MessagesInfos;