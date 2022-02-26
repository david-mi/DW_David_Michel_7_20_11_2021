// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMAS
import commentSchema from '../../YupSchemas/commentSchema';

// CONTEXT
import { refreshData, loginContext } from '../../Context/context';

const apiMessage = 'http://localhost:3000/api/messages';

const CommentPost = ({ messageId }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(commentSchema) });

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

  /* fonction permettant de signaler dans le state si on affiche
  une image ou non */
  const imgReseter = () => setDisplayImage(null);

  /* fonction permettant de reset le formulaire ainsi que l'image affichée */
  const resetForm = () => {
    imgReseter();
    reset();
  };

  /* fonction gérant l'envoi des données ainsi que le reset de certains states */
  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('commentInfos', JSON.stringify(data));
    formData.append('image', data.commentPicture[0]);

    const headers = {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    try {
      await axios.post(`${apiMessage}/${messageId}/comments/new`, formData, { headers });

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

  return (
    <div className='message-post__container'>
      <div className='message-post__card'>

        <form className="post-card__form" onSubmit={handleSubmit(sendForm)}>

          {imageUrl && (
            <div className='image-post-edit__container'>
              <div className='post-picture__container'>
                <img src={imageUrl} className="post__picture" alt="media lié au commentaire"></img>
              </div>
              {errors.file && <small>{errors.file.message}</small>}
            </div>
          )}
          <div className='browse-abort__container'>
            {imageUrl && <button type="button" onClick={imgReseter} className="btn btn-abort">Annuler</button>}
          </div>
          <input
            type="file" id={`commentPicture-${messageId}`} style={{ display: "none" }}
            onInput={(e) => setDisplayImage(e.target.files[0])}
            onClick={(e) => e.target.value = null}
            {...register('commentPicture')}>
          </input>

          <div className='input-label__container'>
            <label htmlFor={`commentText-${messageId}`}>Votre commentaire {caractersNb}/500</label>
            <label htmlFor={`commentPicture-${messageId}`} className='btn-browse'></label>
            <textarea
              placeholder="Commentaire : entre 3 et 500 caractères"
              id={`commentText-${messageId}`}
              {...register('text')}
              maxLength="500"
              onInput={(e) => setCaractersNb(e.target.value.length)} />
            {errors.text && <small>{errors.text.message}</small>}
          </div>

          <div className='submit-reset__container'>
            <input type="submit" className='send-msg__btn btn'></input>
            <button type="button" className='reset-btn btn' onClick={resetForm}>Reset</button>
            {apiError && <small>Erreur : {apiError}</small>}
          </div>
        </form>

      </div>
    </div>
  );
};

export default CommentPost;