// LIBRARIES
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';

// SCHEMAS
import registerSchema from '../YupSchemas/registerSchema';

// PAGES & COMPONENTS & LOGOS
import Header from '../pages/Header';
import Title from '../pages/Title';
import { ShowInput, HideInput } from '../icons-logos/icons';

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });
  const navigate = useNavigate();

  const [Apierror, setApiError] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  const sendForm = async (formdata) => {

    try {
      await axios.post('http://localhost:3000/api/auth/signup', formdata);
      navigate('/login');
    }
    catch (err) {
      const { status, statusText, data } = err.response;
      setApiError({ status, statusText, data });
    }

  };

  const passwordToggle = () => setIsHidden(e => !e);


  return (
    <>
      <Header />
      <Title name="Inscription" />
      <div className='register__container container'>
        <form
          className="form"
          onSubmit={handleSubmit((data) => sendForm(data))}>

          <div className='input-label__container'>
            <label htmlFor="email">Votre mail</label>
            <input placeholder="email" {...register('email')}>
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
            {Apierror && <small>Erreur {Apierror.status} {Apierror.statusText} {Apierror.data}</small>}
          </div>

        </form>
      </div>
    </>
  );
};

export default Register;
