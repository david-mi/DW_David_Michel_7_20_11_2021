// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMAS
import commentSchema from '../../YupSchemas/commentSchema';

// CONTEXT
import { refreshData, loginContext } from '../../Context/context';

// DATA
import { apiMessage, getHeaders } from '../../data/apiData';

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
  const [isShowingMediaInfos, setIsShowingMediaInfos] = useState(false);

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

  /* fonction permettant de reset le state qui indique si on affiche une image et va
  aussi retirer l'image précédemment enregistrée dans le formulaire */
  const resetImg = () => {
    setDisplayImage(null);
    reset({ [`commentPicture-${messageId}`]: { length: 0 } });
  };

  /* fonction permettant de reset le formulaire ainsi que l'image affichée */
  const resetForm = () => {
    setDisplayImage(null);
    reset();
  };

  /* fonction gérant l'envoi des données ainsi que le reset de certains states */
  const sendForm = async (data) => {
    console.log(data);
    console.log(data[`commentPicture-${messageId}`]);
    const formData = new FormData();
    formData.append('commentInfos', JSON.stringify(data));
    formData.append('image', data[`commentPicture-${messageId}`][0]);

    try {
      await axios.post(`${apiMessage}/${messageId}/comments/new`, formData, getHeaders(token, 'multipart'));

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
            {imageUrl && <button type="button" onClick={resetImg} className="btn btn-abort">Annuler</button>}
          </div>
          <input
            type="file" id={`commentPicture-${messageId}`} style={{ display: "none" }}
            onInput={(e) => setDisplayImage(e.target.files[0])}
            onClick={(e) => e.target.value = null}
            {...register(`commentPicture-${messageId}`)}>
          </input>

          <div className='input-label__container'>
            <label htmlFor={`commentText-${messageId}`}>Votre commentaire {caractersNb}/500</label>
            {isShowingMediaInfos && (
              <div className="media-infos">
                <p className='size'><span>Taille maximale :</span>3mo</p>
                <p className='formats'><span>Formats acceptés :</span>gif | png | jp(e)g | webm</p>
              </div>
            )}
            <label
              onMouseOver={() => setIsShowingMediaInfos(true)}
              onMouseLeave={() => setIsShowingMediaInfos(false)}
              htmlFor={`commentPicture-${messageId}`}
              className='btn-browse'>
            </label>
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