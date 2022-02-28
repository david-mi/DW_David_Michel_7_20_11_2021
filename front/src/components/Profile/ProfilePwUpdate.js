import { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// CONTEXT
import { loginContext } from '../../Context/context';

// SCHEMA
import { passwordSchema } from '../../YupSchemas/userSchema';

// PAGES & COMPONENTS & ICONS
import Header from '../../pages/Header';
import Title from '../../pages/Title';
import { ShowInput, HideInput } from '../../icons-logos/icons';
import Logo from '../../icons-logos/Logo';

// DATA 
import { apiUser, getHeaders } from '../../data/apiData';

const ProfilePwUpdate = () => {

  const { setIsLogged, token, USER_ID } = useContext(loginContext);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(passwordSchema) });
  const navigate = useNavigate();

  const [serverInfos, setServerInfos] = useState(null);
  const [changedPw, setChangedPw] = useState(false);
  const [isPrevPwHidden, setIsPrevPwHidden] = useState(true);
  const [isNewPwHidden, setIsNewPwHidden] = useState(true);

  /* fonction qui va envoyer la requête afin de mettre à jour le mot de passe de l'utilisateur. 
  on va aussi nettoyer son localstorage */
  const sendData = async (data) => {
    try {
      const update = await axios.put(`${apiUser}/${USER_ID}/pwupdate`, data, getHeaders(token));
      setServerInfos(update.data.message);
      setChangedPw(true);
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

  /* fonction qui va s'occuper de changer le state indiquant si l'utilisateur 
  est connecté et va le rediriger sur /login */
  const redirect = () => {
    setIsLogged(false);
    navigate('/login');
  };

  // fonctions permettant d'afficher ou non les mots de passe en clair dans l'input
  const prevPasswordToggle = () => setIsPrevPwHidden(e => !e);
  const newPasswordToggle = () => setIsNewPwHidden(e => !e);

  return (
    <>
      <Header />
      <Title name="Changez votre mot de passe" />
      <div className='password-update__wrapper container'>
        {changedPw && (
          <div className='confirm__wrapper'>
            <Logo />
            <div className='confirm__container'>
              <h2>{serverInfos}</h2>
              <i>Veuillez vous connecter avec votre nouveau mot de passe</i>
              <button className='btn' onClick={redirect}>Continuer</button>
            </div>
          </div>
        )}
        <form
          className='form'
          onSubmit={handleSubmit((e) => sendData(e))}>

          <div className='input-label__container'>
            <label htmlFor="previousPw">Votre ancien mot de passe</label>
            <input
              placeholder="ancien mot de passe"
              type={isPrevPwHidden ? 'password' : 'text'}
              {...register('previousPw')}>
            </input>
            <div className='password-toggle' id="oldPwToogle" onClick={prevPasswordToggle}>{isPrevPwHidden ? <HideInput /> : <ShowInput />}</div>
            {errors.previousPw && <small>{errors.previousPw.message}</small>}
          </div>

          <div className='input-label__container'>
            <label htmlFor="newPw">Votre nouveau mot de passe</label>
            <input
              placeholder="nouveau mot de passe"
              type={isNewPwHidden ? 'password' : 'text'}
              {...register('newPw')}>
            </input>
            <div className='password-toggle' id="newPwToogle" onClick={newPasswordToggle}>{isNewPwHidden ? <HideInput /> : <ShowInput />}</div>
            {errors.newPw && <small>{errors.newPw.message}</small>}
          </div>

          <div className='submit-abort__container'>
            <input type="submit" className='btn' value="Send" />
            <button type="button" className='abort-btn btn' onClick={() => navigate(`/profile/${USER_ID}`)}>Annuler</button>
            {serverInfos && <small>Erreur {serverInfos.status} {serverInfos.statusText} {serverInfos.message}</small>}
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfilePwUpdate;
