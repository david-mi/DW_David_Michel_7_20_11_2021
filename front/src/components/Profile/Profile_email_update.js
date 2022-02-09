import { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';

// CONTEXT
import { loginContext } from '../../Context/loginContext';

// SCHEMA
import { emailSchema } from '../../YupSchemas/userSchema';

// PAGES & COMPONENTS
import Header from '../../pages/Header';
import Title from '../../pages/Title';


const apiUsers = 'http://localhost:3000/api/auth/users/';

const Profile_email_update = () => {

  const { isLogged, setIsLogged, token, setToken } = useContext(loginContext);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(emailSchema) });
  const navigate = useNavigate();

  const [serverInfos, setServerInfos] = useState(null);
  const [changedEmail, setChangedEmail] = useState(false);

  const sendData = async (data) => {
    const { USER_ID } = decodeToken(token);
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      const update = await axios.put(`${apiUsers}${USER_ID}/emailupdate`, data, { headers });
      setServerInfos(update.data.message);
      setChangedEmail(true);
      localStorage.clear();
    }
    catch (err) {
      console.log(err);
      if (err.response) {
        const { status, statusText } = err.response;
        const { message } = err.response.data;
        setServerInfos({ status, statusText, message });
      }

    }
  };

  const redirect = () => {
    setIsLogged(false);
    navigate('/login');
  };

  return (
    <div className='email-update__wrapper container'>
      <Header />
      <Title name="Changez votre email" />
      {changedEmail && (
        <div className='confirmation-delete-email confirm__wrapper'>
          <h2 className='confirmation-delete-email__title'>{serverInfos}</h2>
          <i>Veuillez vous connecter avec votre nouvel email</i>
          <button className='confirmation-delete-email__btn' onClick={redirect}>Continuer</button>
        </div>
      )}
      <form
        className='form'
        onSubmit={handleSubmit((e) => sendData(e))}>

        <div className='input-label__container'>
          <label htmlFor="previousEmail"></label>
          <input
            placeholder="Votre mail actuel"
            {...register('previousEmail')}
            style={errors.email && { background: "red" }}>
          </input>
          {errors.previousEmail && <small>{errors.previousEmail.message}</small>}
        </div>

        <div className='input-label__container'>
          <label htmlFor="newEmail"></label>
          <input
            placeholder="Votre nouvel email"
            {...register('newEmail')}
            style={errors.email && { background: "red" }}>
          </input>
          {errors.newEmail && <small>{errors.newEmail.message}</small>}
        </div>

        <div className='input-label__container'>
          <input type="submit" value="Send" />
          {serverInfos && <small>Erreur {serverInfos.status} {serverInfos.statusText} {serverInfos.message}</small>}
        </div>
      </form>
      <button onClick={() => navigate('/profile')}>Annuler</button>
    </div>

  );
};

export default Profile_email_update;
