import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../../YupSchemas/userSchema';
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

  const { profilePicture, username, firstname, lastname, bio } = profileData;
  console.log(profilePicture);

  const { isUpdating, setIsUpdating } = useContext(editingContext);
  const { pictureUpdate, setPictureUpdate } = useContext(profilPictureUpdate);
  const { token } = useContext(loginContext);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(profileSchema) });

  const [displayImage, setDisplayImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isDeletingImg, setIsDeletingImg] = useState(false);
  const [caractersNb, setCaractersNb] = useState(0);

  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('userInfos', JSON.stringify(data));
    formData.append('image', data.picture[0]);

    const { USER_ID } = decodeToken(token);
    const headers = {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };
    await axios.put(`${apiUsers}${USER_ID}/profileupdate`, formData, { headers });
    setIsUpdating(false);
    if (data.picture[0]) {
      console.log('mise à jour de photo');
      setPictureUpdate((e) => !e);
    }
  };

  useEffect(() => bio ? setCaractersNb(bio.length) : setCaractersNb(0), []);

  useEffect(() => {
    displayImage
      ? setImageUrl(URL.createObjectURL(displayImage))
      : setImageUrl(null);
  }, [displayImage]);

  const reseter = (event) => {
    event.preventDefault();
    setDisplayImage(null);
  };

  const hasDefaultPic = () => profilePicture.split('/images/user/')[1] === 'default_profile_picture.jpg';



  hasDefaultPic();
  return (
    <form className="form" onSubmit={handleSubmit(sendForm)}>
      <div className='image-profile-edit__container'>
        <div className='profile-picture__container'>
          <img src={imageUrl || profilePicture} className="profile__picture"></img>
        </div>
        <div className='profil-edit-buttons__container'>
          <label htmlFor="image" className='btn btn-browse'>Parcourir</label>
          {imageUrl
            ? <button onClick={reseter} className="btn btn-abort">Annuler</button>
            : isDeletingImg
              ? <Profile_delete_img data={{ setIsDeletingImg }} />
              : hasDefaultPic() || <button onClick={() => setIsDeletingImg(true)} className="btn btn-delete">Supprimer</button>}
        </div>
        <input
          type="file" id="image" style={{ display: "none" }}
          onInput={(e) => setDisplayImage(e.target.files[0])}
          onClick={(e) => e.target.value = null}
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
        <label htmlFor="bio">Votre bio {caractersNb}/400</label>
        <textarea
          placeholder="Bio : entre 10 et 400 caractères"
          defaultValue={bio}
          {...register('bio')}
          maxLength="400"
          onInput={(e) => setCaractersNb(e.target.value.length)} />
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
