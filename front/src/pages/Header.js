import React from 'react';
import Nav from '../components/Nav';

const Header = () => {

  return (
    <header className='header'>
      <img src='/images/logos/icon-left-font-monochrome-black.svg' className="header__logo" alt="Logo groupomania"></img>
      <Nav />
    </header>
  );
};

export default Header;
