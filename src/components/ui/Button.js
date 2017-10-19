import React from 'react';
import './style/button.scss';

const Button = (props) => {
  const { type, text, onClick } = props;

  return (
    <button className={'Button'} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
