import React from 'react';
import logo from '../../../src/images/Logo.png';
import './header.scss';
//
// Main Header Component
//
const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="" />
      <hr />
    </div>
  );
};

export default Header;
