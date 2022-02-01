// LIBRARIES
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';

// FILES
import registerSchema from '../YupSchemas/registerSchema';

// PAGES & COMPONENTS
import Header from './Header';

const Register = () => {

  const [Apierror, setApiError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });
  const navigate = useNavigate();

  const sendForm = async (formdata) => {

    try {
      await axios.post('http://localhost:3000/api/auth/signup', formdata);
      navigate('/login');
    }
    catch (err) {
      const { status, statusText } = err.response;
      setApiError({ status, statusText });
    }

  };

  return (
    <div className='register__container'>
      <Header />
      <h1>Inscrivez-Vous !</h1>
      <form
        className="register-login__form"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          sendForm(data);
        })}>

        <div className='input-label__container'>
          <label htmlFor="email">Votre mail</label>
          <input placeholder="email" {...register('email')} style={errors.email && { background: "red" }}>
          </input>
          {errors.email && <small>{errors.email.message}</small>}
        </div>

        <div className='input-label__container'>
          <label htmlFor="password">Votre mot de passe</label>
          <input placeholder="mot de passe" {...register('password')} />
          {errors.password && <small>{errors.password.message}</small>}
        </div>

        <div className='input-label__container'>
          <label htmlFor="username">Votre pseudo</label>
          <input placeholder="pseudo" {...register('username')} />
          {errors.username && <small>{errors.username.message}</small>}
        </div>

        <div className='input-label__container'>
          <label htmlFor="firstname">Votre prénom</label>
          <input placeholder="prénom" {...register('firstname')} />
          {errors.firstname && <small>{errors.firstname.message}</small>}
        </div>

        <div className='input-label__container'>
          <label htmlFor="lastname">Votre nom</label>
          <input placeholder="nom"{...register('lastname')} />
          {errors.lastname && <small>{errors.lastname.message}</small>}
        </div>

        <div className='input-label__container'>
          <input type="submit" value="Send" />
          {Apierror && <small>Erreur {Apierror.status} {Apierror.statusText}</small>}
        </div>

      </form>
    </div>
  );
};

export default Register;
