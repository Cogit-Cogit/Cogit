'use client';

import Button from '@/components/Button';
import React, { useState, useEffect, use } from 'react';
import PlusIcon from '@/icons/plus.svg';
import { useMemberState } from '@/app/MemberContext';

function Sidebar() {
  const nickname = 'Cogit';

  const { teamList } = useMemberState();

  return (
    <div className="flex flex-col w-1/6 h-[93vh] px-3 pl-3 border-r-2 border-gray-400 bg-background">
      <div className="flex flex-col">
        <div className="pt-5 mx-auto text-2xl font-black pb-7">{nickname}의 코깃</div>
        <div className="w-4/5 mx-auto border-t-2 border-lightgray" />
        <div className="flex flex-row justify-between pt-5 text-xl font-bold flex-start">
          그룹
          <Button>
            <PlusIcon width={24} height={24} />
          </Button>
        </div>
        {teamList.map((team) => (
          <Button className="py-3 my-1 text-xl rounded-large hover:bg-hover" key={team.id}>
            {team.teamName}
          </Button>
        ))}
        <Button className="py-3 my-1 text-xl rounded-large hover:bg-hover">내 코드보기</Button>
        <Button className="py-3 my-1 text-xl rounded-large hover:bg-hover">
          익스텐션 사용하기
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
