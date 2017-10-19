import React from 'react';

const TextArea = (props) => {
  const { placeholder, onChange, className, autoFocus } = props;

  return (
    <textarea
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      autoFocus={autoFocus}
    />
  );
};

export default TextArea;
