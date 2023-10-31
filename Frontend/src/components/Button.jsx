'use client';

import classnames from 'classnames';
import React from 'react';

function Button({ className, onClick, children }) {
  return (
    <button className={classnames(`font-bold`, className)} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
