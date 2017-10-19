import React from 'react';
import './style/input.scss';

const Input = (props) => {
  const { type, placeholder, value } = props;

  const onChange = (val) => {
    console.log(val, onChange);
  };

  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={'Input'}
    />
  );
};

export default Input;
