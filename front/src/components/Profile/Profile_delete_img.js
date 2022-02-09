// LIBRARIES
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { decodeToken } from "react-jwt";

// CONTEXT
import { profilPictureUpdate } from '../../Context/loginContext';
import { loginContext } from '../../Context/loginContext';

// API PATH
const apiUsers = 'http://localhost:3000/api/auth/users/';

const Profile_delete_img = ({ setIsDeletingImg }) => {

  const { pictureUpdate, setPictureUpdate } = useContext(profilPictureUpdate);
  const { token } = useContext(loginContext);

  const [isImgDeleted, setIsImgDeleted] = useState(false);

  const deleteImage = async (event) => {
    event.preventDefault();
    const { USER_ID } = decodeToken(token);
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.delete(`${apiUsers}${USER_ID}/delimg`, { headers });

    setIsImgDeleted(true);
    setPictureUpdate(true);
  };

  useEffect(() => {
    return () => {
      setPictureUpdate(false);
      console.log('[delete_img] UNMOUNT');
    };


  });

  return (
    <div className='confirm__wrapper'>
      {isImgDeleted
        ? (
          <div className='confirmation-delete'>
            <h2 className='confirmation-delete__title'>Image Supprimée</h2>
            <button className='confirmation-delete__abort-btn' onClick={() => setIsDeletingImg(false)}>Continuer</button>
          </div>
        )
        : (
          <div className='delete-profile-img'>
            <h2 className='delete-profile-img__title'>Votre image de profil va être supprimée</h2>
            <button className='delete-profile-img__confirm-btn' onClick={(e) => deleteImage(e)}>Confirmer</button>
            <button className='delete-profile-img__abort-btn' onClick={() => setIsDeletingImg(false)}>Annuler</button>
          </div>
        )
      }
    </div >
  );
};

export default Profile_delete_img;
