import React from 'react';
import Nav from '../components/Nav';

const Header = () => {

  return (
    <header className='header'>
      <div className='logo__container'>
        <img src='/images/logos/icon-left-font-modif.png' className="header__logo" alt="Logo groupomania" />
      </div>
      <Nav />
    </header>
  );
};

export default Header;
