import React from 'react';
import './style/footer.scss';
import logo from '../../assets/images/tesonet-logo.png';

const Footer = (props) => {
  return (
    <div className={'Footer'}>
      <img src={logo} alt={'Tesonet Logo'}/>
    </div>
  );
};

export default Footer;
