// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMAS
import messageSchema from '../../YupSchemas/messageSchema';

// CONTEXT
import { refreshData, loginContext } from '../../Context/loginContext';

const apiMessage = 'http://localhost:3000/api/messages';

const MessagePost = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(messageSchema) });

  const { setRefreshToogle } = useContext(refreshData);
  const { token } = useContext(loginContext);

  const [displayImage, setDisplayImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [caractersNb, setCaractersNb] = useState(0);
  const [apiError, setApiError] = useState('');

  /* useEffect qui va regarder si une image a été sélectionnée 
  si oui, on utilise la méthode créateObject pour générer une URL et
  la mettre dans un state ImageUrl */
  useEffect(() => {
    displayImage
      ? setImageUrl(URL.createObjectURL(displayImage))
      : setImageUrl(null);
  }, [displayImage]);

  // useEffect qui va supprimer l'erreur affichée venant de l'api au bout d'une seconde
  useEffect(() => apiError && setTimeout(() => setApiError(''), 1000), [apiError]);

  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('postInfos', JSON.stringify(data));
    formData.append('image', data.picture[0]);

    const headers = {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    try {
      await axios.post(`${apiMessage}/new`, formData, { headers });
      setRefreshToogle((e) => !e);
      reset();
      setCaractersNb(0);
      setDisplayImage(null);
    }
    catch (err) {
      const { message } = err.response.data;
      /* on envoie le message d'erreur dans l'api dans un state
      qui sera utilisé pour afficher le message à la fin du formulaire */
      setApiError(message);
    }


  };

  const imgReseter = () => setDisplayImage(null);


  const resetForm = () => {
    setDisplayImage(null);
    reset();
  };

  return (
    <div className='message-post__container'>
      <div className='message-post__card'>

        <form className="post-card__form" onSubmit={handleSubmit(sendForm)}>

          <div className="media-infos__container">
            <p className='media'>media <i>(optionnel)</i></p>
            <p className='media'>max : 3mo - gif | png | jp(e)g | webm</p>
          </div>

          {imageUrl && (
            <div className='image-post-edit__container'>
              <div className='post-picture__container'>
                <img src={imageUrl} className="post__picture"></img>
              </div>
              {errors.file && <small>{errors.file.message}</small>}
            </div>
          )}
          <div className='browse-abort__container'>
            {imageUrl && <button onClick={imgReseter} className="btn btn-abort">Annuler</button>}
            <label htmlFor="picture" className='btn btn-browse'>Parcourir</label>
          </div>
          <input
            type="file" id="picture" style={{ display: "none" }}
            onInput={(e) => setDisplayImage(e.target.files[0])}
            onClick={(e) => e.target.value = null}
            {...register('picture')}>
          </input>

          <div className='input-label__container'>
            <label htmlFor="text">Votre message {caractersNb}/500</label>
            <textarea
              placeholder="Message : entre 10 et 500 caractères"
              id='text'{...register('text')}
              maxLength="500"
              onInput={(e) => setCaractersNb(e.target.value.length)} />
            {errors.text && <small>{errors.text.message}</small>}
          </div>

          <div className='submit-reset__container'>
            <input type="submit" className='send-msg__btn btn'></input>
            <a className='reset-btn btn' onClick={resetForm}>Reset</a>
            {apiError && <small>Erreur : {apiError}</small>}
          </div>
        </form>

      </div>
    </div>
  );
};

export default MessagePost;