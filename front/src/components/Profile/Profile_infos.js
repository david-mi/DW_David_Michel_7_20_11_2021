const Profile_infos = ({ profileData }) => {

  const { profilePicture, username, firstname, lastname, bio, isAdmin } = profileData;

  return (
    <ul className='profile-infos__container'>
      <div className='profile-picture__container'>
        <img src={profilePicture} className="profile__picture" alt="photo de profil" />
      </div>
      <li>Pseudo : {username}</li>
      <li>Prénom : {firstname}</li>
      <li>Nom : {lastname}</li>
      <li>bio : {bio ? bio : 'Pas de description'}</li>
      <li>{isAdmin ? 'Status : Administateur' : 'Status : utilisateur'}</li>
    </ul>
  );

};

export default Profile_infos;
