// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMAS
import commentSchema from '../../YupSchemas/commentSchema';

// CONTEXT
import { refreshData, loginContext } from '../../Context/loginContext';

const apiMessage = 'http://localhost:3000/api/messages';

const CommentPost = ({ messageId }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm({ resolver: yupResolver(commentSchema) });

  const { setRefreshToogle } = useContext(refreshData);
  const { token } = useContext(loginContext);

  const [displayImage, setDisplayImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [caractersNb, setCaractersNb] = useState(0);

  useEffect(() => {
    displayImage
      ? setImageUrl(URL.createObjectURL(displayImage))
      : setImageUrl(null);
  }, [displayImage]);

  const sendForm = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('commentInfos', JSON.stringify(data));
    formData.append('image', data.commentPicture[0]);

    const headers = {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };
    await axios.post(`${apiMessage}/${messageId}/comments/new`, formData, { headers });

    setRefreshToogle((e) => !e);
    console.log('isSubmitSuccess ' + isSubmitSuccessful);
    reset();
    setCaractersNb(0);
    setDisplayImage(null);
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

          <p>image/gif <i>(optionnel)</i></p>

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
            <label htmlFor={`commentPicture-${messageId}`} className='btn btn-browse'>Parcourir</label>
          </div>
          <input
            type="file" id={`commentPicture-${messageId}`} style={{ display: "none" }}
            onInput={(e) => setDisplayImage(e.target.files[0])}
            onClick={(e) => e.target.value = null}
            {...register('commentPicture')}>
          </input>

          <div className='input-label__container'>
            <label htmlFor={`commentText-${messageId}`}>Votre commentaire {caractersNb}/500</label>
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
            <a className='reset-btn btn' onClick={resetForm}>Reset</a>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CommentPost;