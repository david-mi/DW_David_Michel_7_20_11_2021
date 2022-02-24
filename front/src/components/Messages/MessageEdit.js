// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMAS
import messageSchema from '../../YupSchemas/messageSchema';

// CONTEXT
import { refreshData, loginContext } from '../../Context/context';

// COMPONENTS
import MessageDeleteImage from './MessageDeleteImage';

const apiMessage = 'http://localhost:3000/api/messages';

const MessageEdit = (props) => {

  const { setIsEditing, text, attachment, messageId } = props.data;

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(messageSchema) });
  const { setRefreshToogle } = useContext(refreshData);
  const { token } = useContext(loginContext);

  const [displayImage, setDisplayImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isDeletingImg, setIsDeletingImg] = useState(false);
  const [caractersNb, setCaractersNb] = useState(text.length);
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

  /* fonction qui va gérer l'envoi du formulaire avec l'interface formData.
  On rafraîchit ensuite l'affichage des données avec un appel à l'api et on change
  le state pour indiquer que l'on est plus en mode édition */
  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('postInfos', JSON.stringify(data));
    formData.append('image', data.pictureEdit[0]);

    const headers = {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    try {
      await axios.put(`${apiMessage}/${messageId}`, formData, { headers });
      setRefreshToogle((e) => !e);
      setIsEditing(false);
    }
    catch (err) {
      const { message } = err.response.data;
      /* on envoie le message d'erreur dans l'api dans un state
      qui sera utilisé pour afficher le message à la fin du formulaire */
      setApiError(message);
    }

  };

  // fonction pour reset l'url d'image générée 
  const reseter = () => setDisplayImage(null);

  return (
    <form className="form" onSubmit={handleSubmit(sendForm)}>

      <div className="media-infos__container">
        <p className='media'>media <i>(optionnel)</i></p>
        <p className='media'>max : 3mo - gif | png | jp(e)g | webm</p>
      </div>

      {(imageUrl || attachment) && (
        <>
          <div className='image-post-edit__container'>
            <div className='post-picture__container'>
              <img src={imageUrl || attachment} className="post__picture" alt="media lié au message"></img>
            </div>
          </div>
          {imageUrl
            ? <button onClick={reseter} className="btn btn-abort">Annuler</button>
            : isDeletingImg
              ? <MessageDeleteImage data={{ setIsDeletingImg, messageId }} />
              : <button onClick={() => setIsDeletingImg(true)} className="btn btn-delete">Supprimer</button>}
        </>
      )}

      <label htmlFor="pictureEdit" className='btn btn-browse'>Parcourir</label>
      <input
        type="file" id="pictureEdit" style={{ display: "none" }}
        onInput={(e) => setDisplayImage(e.target.files[0])}
        onClick={(e) => e.target.value = null}
        {...register('pictureEdit')}>
      </input>

      <div className='input-label__container'>
        <label htmlFor="text">Votre message {caractersNb}/500</label>
        <textarea
          placeholder="Message : entre 10 et 500 caractères"
          id='text' defaultValue={text}
          {...register('text')}
          maxLength="500"
          onInput={(e) => setCaractersNb(e.target.value.length)}
        />
        {errors.text && <small>{errors.text.message}</small>}
      </div>

      <div className="submit-abort__container">
        <input type="submit" className='send-msg__btn btn'></input>
        <button className='btn' onClick={() => setIsEditing(false)}>Annuler</button>
        {apiError && <small>Erreur : {apiError}</small>}
      </div>

    </form>
  );
};

export default MessageEdit;