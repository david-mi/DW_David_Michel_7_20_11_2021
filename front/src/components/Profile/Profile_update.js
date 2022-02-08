import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import profileSchema from '../../YupSchemas/profileSchema';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { decodeToken } from "react-jwt";


// CONTEXT
import { editingContext, profilPictureUpdate } from '../../Context/loginContext';
import { loginContext } from '../../Context/loginContext';

// PAGES & COMPONENTS
import Profile_delete_img from './Profile_delete_img';

const apiUsers = 'http://localhost:3000/api/auth/users/';

const Profile_update = ({ profileData }) => {

  const { profilePicture, username, firstname, lastname, bio, isAdmin } = profileData;
  const { isUpdating, setIsUpdating } = useContext(editingContext);
  const { pictureUpdate, setPictureUpdate } = useContext(profilPictureUpdate);
  const { token } = useContext(loginContext);

  const [displayImage, setDisplayImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isDeletingImg, setIsDeletingImg] = useState(false);

  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('userInfos', JSON.stringify(data));
    formData.append('image', data.picture[0]);

    const { USER_ID } = decodeToken(token);
    const headers = {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };
    const update = await axios.put(apiUsers + USER_ID, formData, { headers });
    console.log(update.data.message);
    setIsUpdating(false);
    if (data.picture[0]) {
      console.log('mise à jour de photo');
      setPictureUpdate(true);
    }

  };

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(profileSchema) });

  useEffect(() => {
    displayImage
      ? setImageUrl(URL.createObjectURL(displayImage))
      : setImageUrl(null);
  }, [displayImage]);

  const reseter = (event) => {
    event.preventDefault();
    setDisplayImage(null);
  };


  return (
    <form className="register-login__form" onSubmit={handleSubmit(sendForm)}>

      <div className='image-profile-edit__container'>
        <div className='profile-edit__container'>
          <img src={imageUrl || profilePicture} className="profile-edit__image"></img>
        </div>
        <label htmlFor="image" className='profile-edit__label'>Parcourir vos images</label>
        {imageUrl
          ? <button onClick={reseter} className="abort-btn">Annuler</button>
          : isDeletingImg
            ? <Profile_delete_img isDeletingImg={isDeletingImg} setIsDeletingImg={setIsDeletingImg} />
            : <button onClick={() => setIsDeletingImg(true)} className="delimg-btn">Supprimer</button>}
        <input
          type="file" id="image" style={{ display: "none" }}
          onInput={(e) => setDisplayImage(e.target.files[0])}
          {...register('picture')}>
        </input>
        {errors.file && <small>{errors.file.message}</small>}
      </div>


      <div className='input-label__container'>
        <label htmlFor="username">Votre pseudo</label>
        <input placeholder="pseudo" defaultValue={username}{...register('username')} />
        {errors.username && <small>{errors.username.message}</small>}
      </div>

      <div className='input-label__container'>
        <label htmlFor="firstname">Votre prénom</label>
        <input placeholder="prénom" defaultValue={firstname}{...register('firstname')} />
        {errors.firstname && <small>{errors.firstname.message}</small>}
      </div>

      <div className='input-label__container'>
        <label htmlFor="lastname">Votre nom</label>
        <input placeholder="nom" defaultValue={lastname} {...register('lastname')} />
        {errors.lastname && <small>{errors.lastname.message}</small>}
      </div>

      <div className='input-label__container'>
        <label htmlFor="bio">Votre bio</label>
        <textarea placeholder="bio" defaultValue={bio} {...register('bio')} />
        {errors.bio && <small>{errors.bio.message}</small>}
      </div>

      <div className='input-label__container'>
        <input type="submit" value="Valider" />
        {/* {Apierror && <small>Erreur {Apierror.status} {Apierror.statusText}</small>} */}
      </div>

    </form >
  );
};

export default Profile_update;
