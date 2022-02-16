// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMAS
import messageSchema from '../../YupSchemas/messageSchema';

// CONTEXT
import { refreshData, loginContext } from '../../Context/loginContext';

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


  useEffect(() => {
    displayImage
      ? setImageUrl(URL.createObjectURL(displayImage))
      : setImageUrl(null);
  }, [displayImage]);


  const sendForm = async (data) => {
    const formData = new FormData();
    formData.append('postInfos', JSON.stringify(data));
    formData.append('image', data.pictureEdit[0]);

    const headers = {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };
    await axios.put(`${apiMessage}/${messageId}`, formData, { headers });

    setRefreshToogle((e) => !e);
    setIsEditing(false);
  };

  const reseter = () => setDisplayImage(null);

  return (
    <form className="form" onSubmit={handleSubmit(sendForm)}>

      <p>image/gif <i>(optionnel)</i></p>

      {(imageUrl || attachment) && (
        <>
          <div className='image-post-edit__container'>
            <div className='post-picture__container'>
              <img src={imageUrl || attachment} className="post__picture"></img>
            </div>
          </div>
          {imageUrl
            ? <a onClick={reseter} className="btn btn-abort">Annuler</a>
            : isDeletingImg
              ? <MessageDeleteImage data={{ setIsDeletingImg, messageId }} />
              : <a onClick={() => setIsDeletingImg(true)} className="btn btn-delete">Supprimer</a>}
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
      </div>

    </form>
  );
};

export default MessageEdit;