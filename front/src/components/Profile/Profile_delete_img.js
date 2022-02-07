// LIBRARIES
import axios from 'axios';
import { useState } from 'react';

// API PATH
const apiUsers = 'http://localhost:3000/api/auth/users/';

const Profile_delete_img = ({ setIsDeletingImg }) => {

  const [isImgDeleted, setIsImgDeleted] = useState(false);

  const deleteImage = async (event) => {
    event.preventDefault();
    const { USER_ID, token } = JSON.parse(localStorage.getItem('payload'));
    const headers = { 'Authorization': `Bearer ${token}` };
    const deleteImage = await axios.delete(`${apiUsers}${USER_ID}/delimg`, { headers });
    console.log(deleteImage.data.message);
    setIsImgDeleted(true);
  };

  return (
    <div className='delete-profile-img__wrapper'>
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
            <button className='delete-profile-img__confirm-btn' onClick={deleteImage}>Confirmer</button>
            <button className='delete-profile-img__abort-btn' onClick={() => setIsDeletingImg(false)}>Annuler</button>
          </div>
        )
      }
    </div >
  );
};

export default Profile_delete_img;
