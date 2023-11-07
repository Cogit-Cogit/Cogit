import React from 'react';

const RankCard = ({ nickname, index }) => {
  return (
    <div className="w-20 mx-10">
      <img className="m-auto" src="/images/cogit.png" width={40} height={40} />
      <div className="px-4 py-3 text-center">{nickname}</div>
      <div className="px-4 text-center">{index + 1} 등</div>
    </div>
  );
};

export default RankCard;
