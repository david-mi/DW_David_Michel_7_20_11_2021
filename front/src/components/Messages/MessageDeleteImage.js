// LIBRARIES
import axios from 'axios';
import { useContext, useEffect } from 'react';

// CONTEXT
import { refreshData, loginContext } from '../../Context/loginContext';

// API PATH
const apiMessage = 'http://localhost:3000/api/messages/';

const MessageDeleteImage = (props) => {


  const { setIsDeletingImg, messageId } = props.data;
  const { refreshToogle, setRefreshToogle } = useContext(refreshData);

  const { token } = useContext(loginContext);


  const deleteImage = async (event) => {
    event.preventDefault();
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.delete(`${apiMessage}${messageId}/delimg`, { headers });
    setIsDeletingImg(false);
    setRefreshToogle((e) => !e);
  };

  return (
    <div className='confirm__wrapper'>
      <div className='delete-message-img'>
        <h2 className='delete-message-img__title'>Votre image de profil va être supprimée</h2>
        <button className='delete-message-img__confirm-btn' onClick={(e) => deleteImage(e)}>Confirmer</button>
        <button className='delete-message-img__abort-btn' onClick={() => setIsDeletingImg(false)}>Annuler</button>
      </div>
    </div >
  );
};

export default MessageDeleteImage;
