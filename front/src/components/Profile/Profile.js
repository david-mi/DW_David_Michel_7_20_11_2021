// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { decodeToken } from "react-jwt";
import { NavLink, Outlet } from 'react-router-dom';

// CONTEXT
import { loginContext, editingContext, profilPictureUpdate } from '../../Context/loginContext';

// PAGES & COMPONENTS
import Header from '../../pages/Header';
import Profile_infos from './Profile_infos';
import Profile_update from './Profile_update';
import Profile_delete from './Profile_delete';
import Title from '../../pages/Title';

const Profile = () => {

  const { isLogged, setIsLogged } = useContext(loginContext);

  const [pictureUpdate, setPictureUpdate] = useState(profilPictureUpdate);
  const [profileData, setProfileData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getProfileData = async () => {
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
    <>
      <profilPictureUpdate.Provider value={{ pictureUpdate, setPictureUpdate }}>
        <Header />
        <Title name="Profil" />
        <div className='profile__container container slide'>
          {isDeleting && <Profile_delete isDeleting={isDeleting} setIsDeleting={setIsDeleting} />}
          {isUpdating
            ? (
              <editingContext.Provider value={{ isUpdating, setIsUpdating }}>
                <Profile_update profileData={profileData}></Profile_update>
              </editingContext.Provider>
            )
            : <Profile_infos profileData={profileData} />
          }


        </div>
        <div className='profile-buttons'>
          <button className="btn btn-edit" onClick={() => setIsUpdating(e => !e)}>{isUpdating ? 'Annuler' : 'Modifier le profil'}</button>
          <button className="btn btn-delete" onClick={() => setIsDeleting(true)}>Supprimer mon compte</button>
          <NavLink className="nav-btn link-mail" to={'/profile/updatemail'}>Changer le mail</NavLink>
          <NavLink className="nav-btn link-pw" to={'/profile/updatemail'}>Changer le mot de passe</NavLink>
        </div>
      </profilPictureUpdate.Provider>
    </>
  );
};

export default Profile;
