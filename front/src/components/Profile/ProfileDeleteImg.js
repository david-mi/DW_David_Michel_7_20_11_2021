// LIBRARIES
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';

// CONTEXT
import { profilPictureUpdate } from '../../Context/context';
import { loginContext } from '../../Context/context';
import Logo from '../../icons-logos/Logo';

// API PATH
const apiUsers = 'http://localhost:3000/api/auth/users/';

const ProfileDeleteImg = (props) => {

  const { setIsDeletingImg } = props.data;

  const { setPictureUpdate } = useContext(profilPictureUpdate);
  const { token, USER_ID } = useContext(loginContext);

  const [isImgDeleted, setIsImgDeleted] = useState(false);

  /* fonction pour supprimer une image associée à un profil
  qui va aussi lancer un nouvel appel api pour afficher la mise à jour 
  un changement d'état sera aussi fait pour retirer la fenêtre de confirmation */
  const deleteImage = async (event) => {
    event.preventDefault();
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.delete(`${apiUsers}${USER_ID}/delimg`, { headers });
    setIsImgDeleted(true);
    setPictureUpdate(true);
  };

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

export default ProfileDeleteImg;
