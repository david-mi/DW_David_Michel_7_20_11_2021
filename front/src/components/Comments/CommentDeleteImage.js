// // LIBRARIES
// import axios from 'axios';
// import { useContext } from 'react';

// // CONTEXT
// import { refreshData, loginContext } from '../../Context/loginContext';
// import Logo from '../../icons-logos/Logo';

// // API PATH
// const apiMessage = 'http://localhost:3000/api/messages/';

// const MessageDeleteImage = (props) => {

//   const { setIsDeletingImg, messageId } = props.data;
//   const { setRefreshToogle } = useContext(refreshData);
//   const { token } = useContext(loginContext);

//   const deleteImage = async (event) => {
//     event.preventDefault();
//     const headers = { 'Authorization': `Bearer ${token}` };
//     await axios.delete(`${apiMessage}${messageId}/delimg`, { headers });
//     setIsDeletingImg(false);
//     setRefreshToogle((e) => !e);
//   };

//   return (
//     <div className='confirm__wrapper'>
//       <Logo />
//       <div className='confirm__container'>
//         <h2 className='delete-message-img__title'>La photo / gif de votre message sera supprimé(e)</h2>
//         <button className='confirm-btn btn' onClick={(e) => deleteImage(e)}>Confirmer</button>
//         <button className='abort-btn btn' onClick={() => setIsDeletingImg(false)}>Annuler</button>
//       </div>
//     </div >
//   );
// };

// export default MessageDeleteImage;
