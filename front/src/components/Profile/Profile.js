// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { decodeToken } from "react-jwt";

// CONTEXT
import { loginContext, editingContext, profilPictureUpdate } from '../../Context/loginContext';

// PAGES & COMPONENTS
import Header from '../../pages/Header';
import Profile_infos from './Profile_infos';
import Profile_update from './Profile_update';
import Profile_delete from './Profile_delete';

const Profile = () => {

  const { isLogged, setIsLogged } = useContext(loginContext);

  const [pictureUpdate, setPictureUpdate] = useState(profilPictureUpdate);
  const [profileData, setProfileData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [Apierror, setApiError] = useState('');
  console.log('wtf');
  const getProfileData = async () => {
    console.log('enculé');
    const { token, USER_ID } = JSON.parse(localStorage.getItem('payload'));
    // console.log(token);
    // const decode = decodeToken(token);
    // console.log(decode);
    // const { USER_ID } = decode;
    const res = await axios.get(`http://localhost:3000/api/auth/users/${USER_ID}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setProfileData(res.data);
  };

  useEffect(getProfileData, [isUpdating, pictureUpdate]);

  if (!profileData) return null;

  return (
    <div className='profile__container'>
      <profilPictureUpdate.Provider value={{ pictureUpdate, setPictureUpdate }}>
        <Header />
        {isDeleting && <Profile_delete isDeleting={isDeleting} setIsDeleting={setIsDeleting} />}
        <h1>Profil</h1>
        {isUpdating
          ? (
            <editingContext.Provider value={{ isUpdating, setIsUpdating }}>
              <Profile_update profileData={profileData}></Profile_update>
            </editingContext.Provider>
          )
          : <Profile_infos profileData={profileData} />
        }
        <button onClick={() => setIsUpdating(e => !e)}>{isUpdating ? 'Annuler' : 'Modifier le profil'}</button>
        <button onClick={() => setIsDeleting(true)}>Supprimer mon compte</button>
      </profilPictureUpdate.Provider>
    </div>
  );
};

export default Profile;
