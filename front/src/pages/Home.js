import Header from './Header';
import { useContext } from 'react';
import loginContext from '../Context/loginContext';

const Home = () => {

  const { isLogged, setIsLogged } = useContext(loginContext);

  return (
    <div className='home__container'>
      <Header />
      <h1>Accueil</h1>
      <p>{isLogged ? 'vous êtes connecté' : 'vous êtes pas connecté'}</p>
    </div>
  );
};

export default Home;
