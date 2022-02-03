import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import profileSchema from '../../YupSchemas/profileSchema';
import axios from 'axios';
import { useContext } from 'react';
import { editingContext } from '../../Context/loginContext';


const Profile_update = ({ profileData }) => {

  const { profilePicture, username, firstname, lastname, bio, isAdmin } = profileData;
  const { isUpdating, setIsUpdating } = useContext(editingContext);

  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('userInfos', JSON.stringify(data));
    formData.append('userPicture', data.picture[0]);

    const { USER_ID, token } = JSON.parse(localStorage.getItem('payload'));
    const update = await axios.put('http://localhost:3000/api/auth/users/' + USER_ID, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(update);
    setIsUpdating(false);
  };

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(profileSchema) });

  return (
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
        <input type="submit" value="Send" />
        {/* {Apierror && <small>Erreur {Apierror.status} {Apierror.statusText}</small>} */}
      </div>

    </form>
  );
};

export default Profile_update;
