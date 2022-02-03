

const Profile_infos = (props) => {
  const profileData = props.profileData;
  return (
    <ul className='profile-infos__container'>
      <div className='profile-picture__container'>
        <img src={profileData.profilePicture} className="profile__picture" alt="photo de profil" />
      </div>
      <li>Pseudo : {profileData.username}</li>
      <li>Prénom : {profileData.firstname}</li>
      <li>Nom : {profileData.lastname}</li>
      <li>bio : {profileData.bio ? profileData.bio : 'Pas de description'}</li>
      <li>{profileData.isAdmin ? 'Status : Administateur' : 'Status : utilisateur'}</li>
    </ul>
  );
};

export default Profile_infos;
