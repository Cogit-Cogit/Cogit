import React from 'react';

const RankCard = ({ nickname, idx, url }) => {
  return (
    <div className="items-center w-20 mx-10">
      <img className="m-auto" src={`${url}`} width={60} height={60} />
      <div className="px-4 py-1 ">{nickname}</div>
      <div className="px-4 text-center">{idx + 1} 등</div>
    </div>
  );
};

export default RankCard;
