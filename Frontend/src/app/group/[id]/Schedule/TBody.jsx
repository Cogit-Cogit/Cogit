import React from 'react';
import Tr from './Tr';

const TBody = ({ questions, members }) => {
  return (
    <tbody>
      {members.map((member, idx) => {
        return <Tr member={member} questions={questions} key={idx} />;
      })}
    </tbody>
  );
};

export default TBody;
