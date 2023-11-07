import React from 'react';

const questions = ['BOJ1', 'BOJ2', 'BOJ3', 'BOJ4', 'BOJ5'];

const Tr = ({ member }) => {
  return (
    <tr className="bg-white border-2 border-gray-200">
      <td className="px-4 py-3">{member}</td>
      {questions.map((question) => {
        return <td className="px-4 py-3">{question}</td>;
      })}
    </tr>
  );
};

export default Tr;
