// LIBRARIES
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from "react-jwt";

// CONTEXT
import { loginContext } from '../Context/loginContext';

// PAGES & COMPONENTS
import Header from '../pages/Header';
import Title from '../pages/Title';
import MessagesInfos from './Messages/MessagesInfos';

const apiMessage = 'http://localhost:3000/api/messages';

const Home = () => {

  const { isLogged, setIsLogged, token } = useContext(loginContext);

  const [messages, setMessages] = useState(null);
  const [update, setUpdate] = useState(false);

  const getMessages = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    const res = await axios.get(apiMessage + '/all', { headers });
    const data = res.data;
    setMessages(data);
  };

  useEffect(() => {
    getMessages();
  }, []);


  return (
    <>
      <Header />
      <Title name="Accueil" />
      <div className='messages__container container'>
        {messages
          ? (
            messages.map((msg, idx) => (
              <MessagesInfos data={msg} key={idx} />
            ))

          )
          : <p>Aucun message à afficher pour le moment</p>
        }

      </div>
    </>
  );
};

export default Home;
