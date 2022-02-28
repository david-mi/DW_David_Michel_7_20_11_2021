// LIBRARIES
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMA
import loginSchema from '../YupSchemas/loginSchema';

// CONTEXT
import { loginContext } from '../Context/context';

// PAGES & COMPONENTS & ICONS
import Header from '../pages/Header';
import Title from '../pages/Title';
import { ShowInput, HideInput } from '../icons-logos/icons';

// DATA
import { apiLogin } from '../data/apiData';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });
  const navigate = useNavigate();
  const { setIsLogged } = useContext(loginContext);

  const [Apierror, setApiError] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  /* fonction qui va permettre d'envoyer les informations de connexion afin
  de se connecter à l'application. Si les informations sont bonnes, l'api nous renverra un token
  qu'on mettra dans le dans le storage et on sera redirigé sur /home */
  const sendData = async (data) => {
    try {
      setIsLogged(false);
      const response = await axios.post(apiLogin, data);
      const { token } = response.data;
      localStorage.setItem('token', JSON.stringify(token));
      setApiError(false);
      setIsLogged(true);
      navigate('/home');
    }
    catch (err) {
      const { status, data } = err.response;
      const { error, message } = data;
      setApiError({ status, message: message || error });
    }
  };

  // fonction qui permet d'afficher ou non le mot de passe en clair dans l'input
  const passwordToggle = () => setIsHidden(e => !e);

  return (
    <>
      <Header />
      <Title name="Connexion" />
      <div className='login__container container'>
        <form
          className='form'
          onSubmit={handleSubmit(sendData)}>

          <div className='input-label__container'>
            <label htmlFor="email">Votre mail</label>
            <input
              placeholder="email"
              {...register('email')}>
            </input>
            {errors.email && <small>{errors.email.message}</small>}
          </div>

          <div className='input-label__container'>
            <label htmlFor="password">Votre mot de passe</label>
            <input placeholder="mot de passe" type={isHidden ? 'password' : 'text'} {...register('password')} />
            <div className='password-toggle' onClick={passwordToggle}>{isHidden ? <HideInput /> : <ShowInput />}</div>
            {errors.password && <small>{errors.password.message}</small>}
          </div>

          <div className='input-label__container'>
            <input type="submit" value="Send" />
            {Apierror && <small>Erreur {Apierror.status} | {Apierror.message}</small>}
          </div>

        </form>
      </div>
    </>
  );
};

export default Login;
