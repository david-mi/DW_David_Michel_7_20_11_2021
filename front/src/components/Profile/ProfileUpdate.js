// LIBRARIES
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../../YupSchemas/userSchema';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';

// CONTEXT
import { editingContext, profilPictureUpdate } from '../../Context/loginContext';
import { loginContext } from '../../Context/loginContext';

// PAGES & COMPONENTS
import ProfileDeleteImg from './ProfileDeleteImg';

const apiUsers = 'http://localhost:3000/api/auth/users/';

const Profile_update = ({ profileData }) => {

  const { profilePicture, username, firstname, lastname, bio } = profileData;

  const { setIsUpdating } = useContext(editingContext);
  const { setPictureUpdate } = useContext(profilPictureUpdate);
  const { token, USER_ID } = useContext(loginContext);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(profileSchema) });

  const [displayImage, setDisplayImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isDeletingImg, setIsDeletingImg] = useState(false);
  const [caractersNb, setCaractersNb] = useState(0);
  const [apiError, setApiError] = useState('');

  /* useEffect qui va regarder si une image a été sélectionnée 
 si oui, on utilise la méthode créateObject pour générer une URL et
 la mettre dans un state ImageUrl */
  useEffect(() => {
    displayImage
      ? setImageUrl(URL.createObjectURL(displayImage))
      : setImageUrl(null);
  }, [displayImage]);

  // useEffect qui va supprimer l'erreur affichée venant de l'api au bout d'une seconde
  useEffect(() => apiError && setTimeout(() => setApiError(''), 1000), [apiError]);

  // useEffect qui va initialiser la longueur de la bio, 0 si null
  useEffect(() => bio ? setCaractersNb(bio.length) : setCaractersNb(0), []);

  /* fonction qui va gérer l'envoi du formulaire avec l'interface formData. 
  On change ensuite le state pour indiquer que l'on est plus en mode édition et 
  on affiche la nouvelle photo de profil si il y en a une */
  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('userInfos', JSON.stringify(data));
    formData.append('image', data.picture[0]);

    const headers = {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    try {
      await axios.put(`${apiUsers}${USER_ID}/profileupdate`, formData, { headers });
      setIsUpdating(false);
      if (data.picture[0]) setPictureUpdate((e) => !e);
    }
    catch (err) {
      const { message } = err.response.data;
      /* on envoie le message d'erreur dans l'api dans un state
      qui sera utilisé pour afficher le message à la fin du formulaire */
      setApiError(message);
    }

  };

  // fonction pour reset l'url d'image générée 
  const reseter = () => setDisplayImage(null);

  // on check si l'utilisateur à la photo de profil par défaut fourni par le backend
  const hasDefaultPic = () => profilePicture.split('/images/user/')[1] === 'default_profile_picture.jpg';

  return (
    <form className="form" onSubmit={handleSubmit(sendForm)}>

      <div className="media-infos__container">
        <p className='media'>media <i>(optionnel)</i></p>
        <p className='media'>max : 3mo - gif | png | jp(e)g | webm</p>
      </div>

      <div className='image-profile-edit__container'>
        <div className='profile-picture__container'>
          <img src={imageUrl || profilePicture} className="profile__picture"></img>
        </div>
        <div className='profil-edit-buttons__container'>
          <label htmlFor="image" className='btn btn-browse'>Parcourir</label>
          {imageUrl
            ? <a onClick={reseter} className="btn btn-abort">Annuler</a>
            : isDeletingImg
              ? <ProfileDeleteImg data={{ setIsDeletingImg }} />
              : hasDefaultPic() || <a onClick={() => setIsDeletingImg(true)} className="btn btn-delete">Supprimer</a>}
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
        {apiError && <small>Erreur : {apiError}</small>}
      </div>

    </form >
  );
};

export default Profile_update;
