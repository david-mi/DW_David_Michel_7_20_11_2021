import { LikeIcon } from '../../icons/icons';

function MessagesLikes(props) {

  const { showLikeUsers, setShowLikeUsers, Likes } = props.data;

  return (
    <div className='like-container'>
      <span className='like-btn'><LikeIcon /></span>
      <span className='likeNb'
        onMouseOver={() => setShowLikeUsers(true)}
        onMouseLeave={() => setShowLikeUsers(false)}>
        {Likes.length}
      </span>
      {showLikeUsers && Likes.length
        ? (
          <ul className='liked-list'>
            {Likes.map(({ User }, idx) => (
              <li key={idx}>
                {User.firstname} {User.lastname} ({User.username})
              </li>
            ))}
          </ul>
        )
        : null
      }
    </div>
  );
}

export default MessagesLikes;