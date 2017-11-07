import React from 'react';
import './style/button.scss';

const Button = (props) => {
  const { type, text, onClick } = props;

  return (
    <a className={'Button'} type={type} onClick={onClick}>
      {text}
    </a>
  );
};

export default Button;
