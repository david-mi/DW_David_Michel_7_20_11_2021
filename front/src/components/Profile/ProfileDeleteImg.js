// LIBRARIES
import axios from 'axios';
import { useState, useContext } from 'react';

// CONTEXT
import { profilPictureUpdate } from '../../Context/context';
import { loginContext } from '../../Context/context';
import Logo from '../../icons-logos/Logo';

// DATA 
import { apiUser, getHeaders } from '../../data/apiData';

const ProfileDeleteImg = ({ data }) => {

  const { setIsDeletingImg } = data;

  const { setPictureUpdate } = useContext(profilPictureUpdate);
  const { token, USER_ID } = useContext(loginContext);

  const [isImgDeleted, setIsImgDeleted] = useState(false);

  /* fonction pour supprimer une image associée à un profil
  qui va aussi lancer un nouvel appel api pour afficher la mise à jour 
  un changement d'état sera aussi fait pour retirer la fenêtre de confirmation */
  const deleteImage = async () => {
    await axios.delete(`${apiUser}/${USER_ID}/delimg`, getHeaders(token));
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
            <button type="button" className='btn' onClick={(e) => deleteImage(e)}>Confirmer</button>
            <button type="button" className='btn' onClick={() => setIsDeletingImg(false)}>Annuler</button>
          </div>
        )
      }
    </div >
  );
};

export default ProfileDeleteImg;
