// LIBRARIES
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMA
import loginSchema from '../YupSchemas/loginSchema';

// CONTEXT
import { loginContext } from '../Context/loginContext';

// PAGES & COMPONENTS
import Header from '../pages/Header';
import Title from '../pages/Title';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });
  const [Apierror, setApiError] = useState('');
  const navigate = useNavigate();
  const { isLogged, setIsLogged, token, setToken } = useContext(loginContext);

  const sendData = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', data);
      console.log(response);
      const payload = response.data;
      localStorage.setItem('payload', JSON.stringify({ ...payload }));
      console.log('token ' + token);
      setApiError(false);
      setToken(payload.token);
      setIsLogged(true);
    }
    catch (err) {
      console.log(err.response);
      const { status, statusText } = err.response;
      const { message } = err.response.data;
      setApiError({ status, statusText, message });
    }
  };

  useEffect(() => {
    console.log('[useEffect] Login.js');
    console.log('isLogged : ' + isLogged);
    if (isLogged && Apierror === false) navigate('/home');
  }, [isLogged, Apierror]);

  return (
    <>
      <Header />
      <Title name="Connexion" />
      <div className='login__container container'>
        <form
          className='form'
          onSubmit={handleSubmit(data => {
            console.log(data);
            sendData(data);
          })}>

          <div className='input-label__container'>
            <label htmlFor="email">Votre mail</label>
            <input
              placeholder="email"
              {...register('email')}
              style={errors.email && { background: "red" }}>
            </input>
            {errors.email && <small>{errors.email.message}</small>}
          </div>

          <div className='input-label__container'>
            <label htmlFor="password">Votre mot de passe</label>
            <input placeholder="mot de passe" {...register('password')} />
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
