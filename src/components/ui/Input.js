import React from 'react';
import './style/input.scss';

const Input = (props) => {
  const { type, placeholder, value, onChange, valid = true } = props;

  const onInput = (val) => {
    onChange && onChange(val);
  };

  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onInput}
      className={`Input Input__valid-${valid}`}
    />
  );
};

export default Input;
