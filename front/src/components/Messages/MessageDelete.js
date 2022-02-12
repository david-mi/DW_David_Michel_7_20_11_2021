// LIBRARIES
import axios from 'axios';
import { useContext } from 'react';

// CONTEXT
import { loginContext, refreshData } from '../../Context/loginContext';

const MessageDelete = (props) => {

  const { setIsDeleting, messageId } = props.data;

  const { token } = useContext(loginContext);
  const { refreshToogle, setRefreshToogle } = useContext(refreshData);

  const deleteMessage = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    await axios.delete(`http://localhost:3000/api/messages/${messageId}`, { headers });
    setIsDeleting(false);
    setRefreshToogle((e) => !e);
  };

  return (
    <div className='confirm__wrapper'>
      <div className='delete-message'>
        <h2 className='delete-message__title'>Vous êtes sûr de vouloir supprimer ce message ?</h2>
        <i className='delete-message__info'>cette action est irréversible</i>
        <button className='delete-message__confirm-btn' onClick={deleteMessage}>Oui</button>
        <button className='delete-message__abort-btn' onClick={() => setIsDeleting(false)}>Annuler</button>
      </div>
    </div >
  );
};

export default MessageDelete;
