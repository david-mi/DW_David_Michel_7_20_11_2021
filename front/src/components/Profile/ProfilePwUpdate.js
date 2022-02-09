import { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';

// CONTEXT
import { loginContext } from '../../Context/loginContext';

// SCHEMA
import { passwordSchema } from '../../YupSchemas/userSchema';

// PAGES & COMPONENTS
import Header from '../../pages/Header';
import Title from '../../pages/Title';


const apiUsers = 'http://localhost:3000/api/auth/users/';

const ProfilePwUpdate = () => {

  const { isLogged, setIsLogged, token, setToken } = useContext(loginContext);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(passwordSchema) });
  const navigate = useNavigate();

  const [serverInfos, setServerInfos] = useState(null);
  const [changedEmail, setChangedEmail] = useState(false);

  const sendData = async (data) => {
    const { USER_ID } = decodeToken(token);
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      const update = await axios.put(`${apiUsers}${USER_ID}/pwupdate`, data, { headers });
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
    <>
      <Header />
      <Title name="Changez votre mot de passe" />
      <div className='password-update__wrapper container'>
        {changedEmail && (
          <div className='confirmation-update-password confirm__wrapper'>
            <h2 className='confirmation-update-password__title'>{serverInfos}</h2>
            <i>Veuillez vous connecter avec votre nouveau mot de passe</i>
            <button className='confirmation-update-password__btn' onClick={redirect}>Continuer</button>
          </div>
        )}
        <form
          className='form'
          onSubmit={handleSubmit((e) => sendData(e))}>

          <div className='input-label__container'>
            <label htmlFor="previousPw"></label>
            <input
              placeholder="Votre mot de passe actuel"
              {...register('previousPw')}
              style={errors.previousPw && { background: "red" }}>
            </input>
            {errors.previousPw && <small>{errors.previousPw.message}</small>}
          </div>

          <div className='input-label__container'>
            <label htmlFor="newPw"></label>
            <input
              placeholder="Votre nouveau mot de passe"
              {...register('newPw')}
              style={errors.newPw && { background: "red" }}>
            </input>
            {errors.newPw && <small>{errors.newPw.message}</small>}
          </div>

          <div className='input-label__container'>
            <input type="submit" value="Send" />
            {serverInfos && <small>Erreur {serverInfos.status} {serverInfos.statusText} {serverInfos.message}</small>}
          </div>
          <button className='abort-btn' onClick={() => navigate('/profile')}>Annuler</button>
        </form>
      </div>
    </>
  );
};

export default ProfilePwUpdate;
