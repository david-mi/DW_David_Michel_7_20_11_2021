// LIBRARIES
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';

// CONTEXT
import { profilPictureUpdate } from '../../Context/loginContext';
import { loginContext } from '../../Context/loginContext';
import Logo from '../../icons-logos/Logo';

// API PATH
const apiUsers = 'http://localhost:3000/api/auth/users/';

const Profile_delete_img = (props) => {

  const { setIsDeletingImg } = props.data;

  const { setPictureUpdate } = useContext(profilPictureUpdate);
  const { token, USER_ID } = useContext(loginContext);

  const [isImgDeleted, setIsImgDeleted] = useState(false);

  const deleteImage = async (event) => {
    event.preventDefault();
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.delete(`${apiUsers}${USER_ID}/delimg`, { headers });

    setIsImgDeleted(true);
    setPictureUpdate(true);
  };

  useEffect(() => () => setPictureUpdate(false));

  return (
    <div className='confirm__wrapper'>
      <Logo />
      {isImgDeleted
        ? (
          <div className='confirm__container'>
            <h2>Image Supprimée</h2>
            <button className='btn' onClick={() => setIsDeletingImg(false)}>Continuer</button>
          </div>
        )
        : (
          <div className='confirm__container'>
            <h2>Votre image de profil va être supprimée</h2>
            <button className='btn' onClick={(e) => deleteImage(e)}>Confirmer</button>
            <button className='btn' onClick={() => setIsDeletingImg(false)}>Annuler</button>
          </div>
        )
      }
    </div >
  );
};

export default Profile_delete_img;
