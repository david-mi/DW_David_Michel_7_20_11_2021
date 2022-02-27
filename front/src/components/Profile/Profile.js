// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

// CONTEXT
import { editingContext, profilPictureUpdate, loginContext } from '../../Context/context';

// PAGES & COMPONENTS
import Header from '../../pages/Header';
import ProfileInfos from './ProfileInfos';
import ProfileUpdate from './ProfileUpdate';
import ProfileDelete from './ProfileDelete';
import Title from '../../pages/Title';

// DATA 
import { apiUser, getHeaders } from '../../data/apiData';

const Profile = () => {

  const { id } = useParams();

  const { token, USER_ID } = useContext(loginContext);
  const [pictureUpdate, setPictureUpdate] = useState(profilPictureUpdate);
  const [profileData, setProfileData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  /* useEffect qui va appeller la fonction getProfileData a chaque changement d'état
  du state isUpdating ou pictureUpdate */
  useEffect(() => {

    // fonction qui va envoyer la requête pour récupérer les infos d'un profil et les mettre dans un state
    const getProfileData = async () => {
      const userId = Number(id);
      if (userId === USER_ID) setIsOwner(true);
      const res = await axios.get(`${apiUser}/${userId}`, getHeaders(token));
      setProfileData(res.data);
    };
    getProfileData();
  }, [isUpdating, pictureUpdate, token, USER_ID, id]);

  // si aucune donnée n'est présente dans le state profileDate, le composant retournera null
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
