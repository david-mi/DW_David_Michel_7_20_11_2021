// LIBRARIES
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMA
import loginSchema from '../YupSchemas/loginSchema';

// CONTEXT
import { loginContext } from '../Context/loginContext';

// PAGES & COMPONENTS & ICONS
import Header from '../pages/Header';
import Title from '../pages/Title';
import { ShowInput, HideInput } from '../icons-logos/icons';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });
  const navigate = useNavigate();
  const { setIsLogged, setToken } = useContext(loginContext);

  const [Apierror, setApiError] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  const sendData = async (data) => {
    try {
      setIsLogged(false);
      const response = await axios.post('http://localhost:3000/api/auth/login', data);
      const { token } = response.data;
      localStorage.setItem('token', JSON.stringify(token));
      setApiError(false);
      setToken(token);
      setIsLogged(true);
      navigate('/home');
    }
    catch (err) {
      console.log(err);
      const { status, statusText } = err.response;
      const { message } = err.response.data;
      setApiError({ status, statusText, message });
    }
  };

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
            {Apierror && <small>Erreur {Apierror.status} {Apierror.statusText} {Apierror.message}</small>}
          </div>

        </form>
      </div>
    </>
  );
};

export default Login;
