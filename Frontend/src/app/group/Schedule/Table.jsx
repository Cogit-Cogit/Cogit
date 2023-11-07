'use client';

import React from 'react';

import TBody from './TBody';
import THead from './THead';

const Table = () => {
  return (
    <table className="w-[90%] text-center m-auto">
      <THead></THead>
      <TBody></TBody>
    </table>
  );
};

export default Table;
