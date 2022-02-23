// LIBRARIES
import { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// CONTEXT
import { loginContext } from '../../Context/loginContext';

// SCHEMA
import { emailSchema } from '../../YupSchemas/userSchema';

// PAGES & COMPONENTS
import Header from '../../pages/Header';
import Title from '../../pages/Title';
import Logo from '../../icons-logos/Logo';


const apiUsers = 'http://localhost:3000/api/auth/users/';

const Profile_email_update = () => {

  const { setIsLogged, token, USER_ID } = useContext(loginContext);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(emailSchema) });
  const navigate = useNavigate();

  const [serverInfos, setServerInfos] = useState(null);
  const [changedEmail, setChangedEmail] = useState(false);

  const sendData = async (data) => {
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      const update = await axios.put(`${apiUsers}${USER_ID}/emailupdate`, data, { headers });
      setServerInfos(update.data.message);
      setChangedEmail(true);
      localStorage.clear();
    }
    catch (err) {
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
    <>
      <Header />
      <Title name="Changez votre email" />
      <div className='email-update__wrapper container'>
        {changedEmail && (
          <div className='confirm__wrapper'>
            <Logo />
            <div className='confirm__container'>
              <h2>{serverInfos}</h2>
              <i>Veuillez vous connecter avec votre nouvel email</i>
              <button className='btn' onClick={redirect}>Continuer</button>
            </div>
          </div>
        )}
        <form
          className='form'
          onSubmit={handleSubmit((e) => sendData(e))}>

          <div className='input-label__container'>
            <label htmlFor="previousEmail"></label>
            <input
              placeholder="Votre mail actuel"
              {...register('previousEmail')}>
            </input>
            {errors.previousEmail && <small>{errors.previousEmail.message}</small>}
          </div>

          <div className='input-label__container'>
            <label htmlFor="newEmail"></label>
            <input
              placeholder="Votre nouvel email"
              {...register('newEmail')}>
            </input>
            {errors.newEmail && <small>{errors.newEmail.message}</small>}
          </div>

          <div className='input-label__container'>
            <input type="submit" value="Envoyer" />
            {serverInfos && <small>Erreur {serverInfos.status} {serverInfos.statusText} {serverInfos.message}</small>}
          </div>

          <button className='abort-btn' onClick={() => navigate(`/profile/${USER_ID}`)}>Annuler</button>

        </form>
      </div>
    </>
  );
};

export default Profile_email_update;