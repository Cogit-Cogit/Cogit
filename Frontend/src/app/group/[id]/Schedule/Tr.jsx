import React, { useState } from 'react';
import LinkTd from './LinkTd';

function Tr({ member, questions }) {
  var num = 0;

  return (
    <tr className="bg-white border-2 border-gray-200">
      <td className="px-4 py-3">{member.memberNickname}</td>
      {questions.map((question, iIdx) => {
        num = 0;
        question.memberAlgorithmQuestList.map((memberQuest, jIdx) => {
          if (memberQuest.memberId == member.memberId) {
            console.log(
              'memberId : ' +
                memberQuest.memberId +
                ' num : ' +
                memberQuest.memberAlgorithmQuestSolved,
            );
            if (memberQuest.memberAlgorithmQuestSolved > 0) {
              return (
                <LinkTd
                  member={member}
                  questionId={question.algorithmQuestId}
                  solved={memberQuest.memberAlgorithmQuestSolved}
                />
              );
            } else {
              return <td></td>;
            }
          }
        });
      })}
    </tr>
  );
}

export default Tr;
