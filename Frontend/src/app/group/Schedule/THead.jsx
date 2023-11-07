import React from 'react';
import Th from './Th';

const questions = ['이름', 'BOJ1', 'BOJ2', 'BOJ3', 'BOJ4', 'BOJ5'];

const THead = () => {
  return (
    <>
      <thead>
        <tr className="bg-gray-800">
          {questions.map((question) => {
            return <Th question={question} />;
          })}
        </tr>
      </thead>
    </>
  );
};

export default THead;
