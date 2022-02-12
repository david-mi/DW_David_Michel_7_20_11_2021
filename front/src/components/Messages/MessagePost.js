// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMAS
import messageSchema from '../../YupSchemas/messageSchema';

// CONTEXT
import { refreshData } from '../../Context/loginContext';

const apiMessage = 'http://localhost:3000/api/messages';

const MessagePost = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm({ resolver: yupResolver(messageSchema) });

  const { refreshToogle, setRefreshToogle } = useContext(refreshData);


  const [displayImage, setDisplayImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    displayImage
      ? setImageUrl(URL.createObjectURL(displayImage))
      : setImageUrl(null);
  }, [displayImage]);




  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('postInfos', JSON.stringify(data));
    formData.append('image', data.picture[0]);

    const { token } = JSON.parse(localStorage.getItem('payload'));

    const headers = {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };
    await axios.post(`${apiMessage}/new`, formData, { headers });

    setRefreshToogle((e) => !e);
    console.log('isSubmitSuccess ' + isSubmitSuccessful);
    reset();
    setDisplayImage(null);
  };

  const imgReseter = (event) => {
    event.preventDefault();
    setDisplayImage(null);
  };

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
            <label htmlFor="picture" className='btn btn-browse'>Parcourir</label>
          </div>
          <input
            type="file" id="picture" style={{ display: "none" }}
            onInput={(e) => setDisplayImage(e.target.files[0])}
            onClick={(e) => e.target.value = null}
            {...register('picture')}>
          </input>



          <div className='input-label__container'>
            <label htmlFor="text">Votre message</label>
            <textarea placeholder="Message : entre 10 et 500 caractères" id='text'{...register('text')} />
            {errors.text && <small>{errors.text.message}</small>}
          </div>

          <div className='submit-reset__container'>
            <input type="submit" className='send-msg__btn btn'></input>
            <button className='reset-btn btn' onClick={resetForm}>Reset</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default MessagePost;