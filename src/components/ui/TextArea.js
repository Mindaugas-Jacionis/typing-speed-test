import React from 'react';

const TextArea = (props) => {
  const { placeholder, onChange, className, autoFocus, value } = props;

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      autoFocus={autoFocus}
    />
  );
};

export default TextArea;
