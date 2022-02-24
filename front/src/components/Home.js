// LIBRARIES
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

// CONTEXT
import { refreshData, loginContext } from '../Context/context';

// PAGES & COMPONENTS
import Header from '../pages/Header';
import Title from '../pages/Title';
import MessagesInfos from './Messages/MessageInfos';
import MessagePost from './Messages/MessagePost';

const apiMessage = 'http://localhost:3000/api/messages';

const Home = () => {

  const { token } = useContext(loginContext);

  const [messages, setMessages] = useState(null);
  const [refreshToogle, setRefreshToogle] = useState(false);

  /* fonction qui va faire une requête api afin de récupérer 
  toutes les informations qui seront affichés (messages, commentaires, likes, utilisateurs...)*/
  const getMessages = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    const res = await axios.get(apiMessage + '/all', { headers });
    const data = res.data;
    setMessages(data);
  };

  /* useEffect qui va appeler la fonction getMessages à chaque changement d'état
  du state refreshToggle */
  useEffect(getMessages, [refreshToogle]);

  return (
    <>
      <Header />
      <Title name="Accueil" />
      <refreshData.Provider value={{ refreshToogle, setRefreshToogle }}>
        <MessagePost />
        <div className='messages__container container slide'>
          {messages
            ? messages
              .sort((prev, next) => next.id - prev.id)
              .map((msg, idx) => <MessagesInfos data={msg} key={idx} />)
            : <p className='nomsg'>Aucun message à afficher pour le moment</p>
          }
        </div>
      </refreshData.Provider>
    </>
  );
};

export default Home;
