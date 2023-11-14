import React from 'react';
import Link from 'next/link';

const THead = ({ questions }) => {
  return (
    <>
      <thead>
        <tr className="bg-gray-800">
          <th className="px-4 py-3 text-gray-300">이름</th>
          {questions.map((question, idx) => {
            return (
              <th className="px-4 py-3 text-gray-300" key={idx}>
                <Link href={question.algorithmQuestUrl}>
                  {question.algorithmQuestPlatform}
                  <br />
                  {question.algorithmQuestNumber}
                </Link>
              </th>
            );
          })}
        </tr>
      </thead>
    </>
  );
};

export default THead;
