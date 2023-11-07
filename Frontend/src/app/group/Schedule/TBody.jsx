import React from 'react';
import Tr from './Tr';

const members = ['이현구', '연제정', '박성준', '주창훈', '박현철', '임하은'];

const TBody = () => {
  return (
    <tbody>
      {members.map((member) => {
        return <Tr member={member} />;
      })}
    </tbody>
  );
};

export default TBody;
