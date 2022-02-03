// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import FormData from 'form-data';

// CONTEXT
import loginContext from '../../Context/loginContext';

// SCHEMAS
import profileSchema from '../../YupSchemas/profileSchema';

// PAGES & COMPONENTS
import Header from '../../pages/Header';
import Profile_infos from './Profile_infos';

const Profile = () => {

  const { isLogged, setIsLogged } = useContext(loginContext);
  const [profileData, setProfileData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(profileSchema) });
  const [Apierror, setApiError] = useState('');

  const getProfileData = async () => {
    const { USER_ID } = JSON.parse(localStorage.getItem('payload'));
    const res = await axios.get(`http://localhost:3000/api/auth/users/${USER_ID}`);
    console.log(res.data);
    setProfileData(res.data);
  };

  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('userInfos', JSON.stringify(data));
    formData.append('userPicture', data.picture[0]);
    console.log(formData);

    const { USER_ID, token } = JSON.parse(localStorage.getItem('payload'));
    const update = await axios.put('http://localhost:3000/api/auth/users/11', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(update);
    setIsUpdating(false);
  };

  useEffect(() => {
    console.log('[UseEffect] Profile.js');
    getProfileData();
  }, [isUpdating]);

  if (!profileData) return null;

  return (
    <div className='profile__container'>
      <Header />
      <h1>Profil</h1>
      {isUpdating
        ? (
          <form
            className="register-login__form"
            onSubmit={handleSubmit(sendForm)}>

            <div className='input-label__container'>
              <input type='file' {...register('picture')} style={errors.file && { background: "red" }}>
              </input>
              {errors.file && <small>{errors.file.message}</small>}
            </div>

            <div className='input-label__container'>
              <label htmlFor="username">Votre pseudo</label>
              <input placeholder="pseudo" defaultValue={profileData.username}{...register('username')} />
              {errors.username && <small>{errors.username.message}</small>}
            </div>

            <div className='input-label__container'>
              <label htmlFor="firstname">Votre prénom</label>
              <input placeholder="prénom" defaultValue={profileData.firstname}{...register('firstname')} />
              {errors.firstname && <small>{errors.firstname.message}</small>}
            </div>

            <div className='input-label__container'>
              <label htmlFor="lastname">Votre nom</label>
              <input placeholder="nom" defaultValue={profileData.lastname} {...register('lastname')} />
              {errors.lastname && <small>{errors.lastname.message}</small>}
            </div>

            <div className='input-label__container'>
              <label htmlFor="bio">Votre bio</label>
              <textarea placeholder="bio" defaultValue={profileData.bio} {...register('bio')} />
              {errors.bio && <small>{errors.bio.message}</small>}
            </div>

            <div className='input-label__container'>
              <input type="submit" value="Send" />
              {Apierror && <small>Erreur {Apierror.status} {Apierror.statusText}</small>}
            </div>

          </form>
        )
        : (
          <Profile_infos profileData={profileData} />
          // <ul className='profile-infos__container'>
          //   <div className='profile-picture__container'>
          //     <img src={profileData.profilePicture} className="profile__picture" alt="photo de profil" />
          //   </div>
          //   <li>Pseudo : {profileData.username}</li>
          //   <li>Prénom : {profileData.firstname}</li>
          //   <li>Nom : {profileData.lastname}</li>
          //   <li>bio : {profileData.bio ? profileData.bio : 'Pas de description'}</li>
          //   <li>{profileData.isAdmin ? 'Status : Administateur' : 'Status : utilisateur'}</li>
          // </ul>
        )
      }
      <button onClick={() => setIsUpdating(e => !e)}>{isUpdating ? 'Annuler' : 'Modifier le profil'}</button>
      <button>Supprimer mon compte</button>
    </div>
  );
};

export default Profile;
