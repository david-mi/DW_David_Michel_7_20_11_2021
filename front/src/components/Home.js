// LIBRARIES
import { useContext } from 'react';

// CONTEXT
import { loginContext } from '../Context/loginContext';

// PAGES & COMPONENTS
import Header from '../pages/Header';
import Title from '../pages/Title';

const Home = () => {

  const { isLogged, setIsLogged } = useContext(loginContext);

  return (
    <>
      <Header />
      <Title name="Accueil" />
      <div className='home__container container'>
        <p>{isLogged ? 'vous êtes connecté' : 'vous êtes pas connecté'}</p>
      </div>
    </>
  );
};

export default Home;
