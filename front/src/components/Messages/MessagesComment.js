// LIBRARIES
import { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';

// ICONS
import { MessageIcon } from '../../icons-logos/icons';

const MessagesComment = ({ data }) => {

  const { Comments, isShowingComments, setIsShowingComments, messageId } = data;

  const [showCommentUsers, setShowCommentsUsers] = useState(null);


  const scrollClosingHandle = () => {

    const cmtContainer = document.getElementById(`${messageId}wrap`);

    const boundingCmt = cmtContainer.getBoundingClientRect();
    const cmtHeight = boundingCmt.height;

    const cmtTop = boundingCmt.top;
    const realCmtTop = cmtTop + window.scrollY;
    const clientHeight = window.innerHeight;
    const difference = clientHeight - cmtHeight;

    console.table({ cmtTop, realCmtTop, clientHeight, difference });

    scroll.scrollTo(realCmtTop - difference, {
      duration: 900,
      smooth: 'easeInSine'
    });
  };

  useEffect(() => {
    if (isShowingComments) {
      scrollClosingHandle();
    }
  }, [isShowingComments]);


  // permet de compter le nombre de commentaire par utilisateur sur un post
  // au lieu d'afficher par exemple 2 fois Jean, une variable nb sera incrémenté et 
  // pourra être réutilisée dans le map effectué sur le return

  const commentsUsersHandler = () => {

    const usersMap = Comments.map(comment => comment.User);

    return usersMap.reduce((arr, cmt, i) => {

      const find = arr.find((elem) => (
        elem.firstname === cmt.firstname &&
        elem.lastname === cmt.lastname &&
        elem.username === cmt.username
      ));

      find
        ? find.nb++
        : arr[i] = {
          firstname: cmt.firstname,
          lastname: cmt.lastname,
          username: cmt.username,
          nb: 1
        };

      return arr;

    }, []);
  };

  const users = commentsUsersHandler;

  return (
    <>
      <div className='comment-container'>
        <a className='comment-btn'
          id={`comment-btn${messageId}`}
          onClick={() => setIsShowingComments(e => !e)}>
          <MessageIcon />
        </a>
        <span className='commentNb'
          onMouseOver={() => setShowCommentsUsers(true)}
          onMouseLeave={() => setShowCommentsUsers(false)}
        >
          {Comments.length}
        </span>
        {showCommentUsers && Comments.length
          ? (
            // au hover, le nom, prénom et pseudo de l'utilisateur seront affichés 
            // ainsi que le nombre de commentaires si l'utilisateur à commenté ce post 
            // plus d'une fois
            <ul className='comment-list'>
              {users().map((user, idx) => (
                <li key={idx}>
                  {user.firstname} {user.lastname} ({user.username}) {user.nb > 1 && 'x' + user.nb}
                </li>
              ))}
            </ul>
          )
          : null
        }
      </div>

    </>
  );

};

export default MessagesComment;