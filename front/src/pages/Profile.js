// LIBRARIES
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';

// CONTEXT
import loginContext from '../Context/loginContext';

// PAGES & COMPONENTS
import Header from './Header';

const Profile = () => {

  const { isLogged, setIsLogged } = useContext(loginContext);
  const [profileData, setProfileData] = useState(null);

  const getProfileData = async () => {
    const { USER_ID } = JSON.parse(localStorage.getItem('payload'));
    const res = await axios.get(`http://localhost:3000/api/auth/users/${USER_ID}`);
    console.log(res.data);
    setProfileData(res.data);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (!profileData) return null;


  return (
    <div className='profile__container'>
      <Header />
      <h1>Profil</h1>
      <div className='profile__loader'>

      </div>
      <ul className='profile-infos__container'>
        <img src={profileData.profilePicture} alt="photo de profil" />
        <li>Pseudo : {profileData.username}</li>
        <li>Prénom : {profileData.firstname}</li>
        <li>Nom : {profileData.lastname}</li>
        <li>bio : {profileData.bio ? profileData.bio : 'Pas de description'}</li>
        <li></li>
        <li>{profileData.isAdmin ? 'Status : Administateur' : 'Status : utilisateur'}</li>
      </ul>
    </div>
  );
};

export default Profile;
