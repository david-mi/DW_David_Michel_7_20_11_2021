const Profile_infos = ({ profileData }) => {

  const { profilePicture, username, firstname, lastname, bio, isAdmin } = profileData;

  return (
    <ul className='profile-infos__container'>
      <div className='profile-picture__container'>
        <img src={profilePicture} className="profile__picture" alt="photo de profil" />
      </div>
      <li className='username-container'>
        <span className='attribute'>PSEUDO</span>
        <span className='value'>{username}</span>
      </li>
      <li className='firstname-container'>
        <span className='attribute'>PRÉNOM</span>
        <span className='value'>{firstname}</span>
      </li>
      <li className='lastname-container'>
        <span className='attribute'>NOM</span>
        <span className='value'>{lastname}</span>
      </li>
      <li className='bio-container'>
        <span className='attribute'>BIO</span>
        <span className='value'>{bio ? bio : 'Pas de description'}</span>
      </li>
      <li className='status-container'>
        <span className='attribute'>STATUS</span>
        <span className='value'>{isAdmin ? 'Administateur' : 'utilisateur'}</span>
      </li>
    </ul>
  );

};

export default Profile_infos;
