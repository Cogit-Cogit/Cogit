import React from 'react';

const Tr = ({ member, questions }) => {
  return (
    <tr className="bg-white border-2 border-gray-200">
      <td className="px-4 py-3">{member.memberName}</td>
      {questions.map((question, iIdx) => {
        question.memberAlgorithmQuestList.map((memberQuest, jIdx) => {
          if (memberQuest.memberId === member.memberId) {
            return (
              <td className="px-4 py-3" key={(iIdx, jIdx)}>
                {memberQuest.memberAlgorithmQuestSolved}
              </td>
            );
          }
        });
      })}
    </tr>
  );
};

export default Tr;
