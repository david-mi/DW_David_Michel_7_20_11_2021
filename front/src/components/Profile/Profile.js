// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

// CONTEXT
import { editingContext, profilPictureUpdate, loginContext } from '../../Context/loginContext';

// PAGES & COMPONENTS
import Header from '../../pages/Header';
import ProfileInfos from './ProfileInfos';
import ProfileUpdate from './ProfileUpdate';
import ProfileDelete from './ProfileDelete';
import Title from '../../pages/Title';

const Profile = () => {

  const { id } = useParams();

  const { token, USER_ID } = useContext(loginContext);
  const [pictureUpdate, setPictureUpdate] = useState(profilPictureUpdate);
  const [profileData, setProfileData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const getProfileData = async () => {

    if (id == USER_ID) setIsOwner(true);
    const res = await axios.get(`http://localhost:3000/api/auth/users/${id}`, {
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
          {isDeleting && <ProfileDelete isDeleting={isDeleting} setIsDeleting={setIsDeleting} />}
          {isUpdating
            ? (
              <editingContext.Provider value={{ isUpdating, setIsUpdating }}>
                <ProfileUpdate profileData={profileData}></ProfileUpdate>
              </editingContext.Provider>
            )
            : <ProfileInfos profileData={profileData} />
          }
        </div>
        {isOwner && (
          <div className='profile-buttons'>
            <button className="btn btn-edit" onClick={() => setIsUpdating(e => !e)}>{isUpdating ? 'Annuler' : 'Modifier le profil'}</button>
            <button className="btn btn-delete" onClick={() => setIsDeleting(true)}>Supprimer mon compte</button>
            <NavLink className="nav-btn link-mail" to={'/profile/updatemail'}>Changer le mail</NavLink>
            <NavLink className="nav-btn link-pw" to={'/profile/updatepassword'}>Changer le mot de passe</NavLink>
          </div>
        )}
      </profilPictureUpdate.Provider>
    </>
  );
};

export default Profile;
