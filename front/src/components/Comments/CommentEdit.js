// LIBRARIES
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// SCHEMAS
import commentSchema from '../../YupSchemas/commentSchema';

// CONTEXT
import { refreshData, loginContext } from '../../Context/loginContext';

// COMPONENTS
import CommentDeleteImage from './CommentDeleteImage';

const apiComment = 'http://localhost:3000/api/comments';

const CommentEdit = (props) => {

  const { setIsEditing, text, attachment, messageId, commentId } = props.data;

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(commentSchema) });
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
    formData.append('commentInfos', JSON.stringify(data));
    formData.append('image', data.pictureEdit[0]);

    const headers = {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };
    await axios.put(`${apiComment}/${commentId}`, formData, { headers });

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
              ? <CommentDeleteImage data={{ setIsDeletingImg, messageId }} />
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
        <label htmlFor="text">Votre Commentaire {caractersNb}/500</label>
        <textarea
          placeholder="Comment : entre 10 et 500 caractères"
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

export default CommentEdit;