'use client';

import React from 'react';
import { Section } from '@/components/Section';
import RankCard from './RankCard';
import RankingIcon from '@/icons/ranking.svg';

const members = ['이현구', '연제정', '박성준', '주창훈', '박현철', '임하은'];

const Ranking = () => {
  return (
    <Section className="w-full p-[20px] mt-[20px] mr-[10px]">
      <Section.Title>
        <div className="flex">
          <RankingIcon width={36} height={36} />
          <p className="ml-2">랭킹</p>
        </div>
      </Section.Title>
      <Section.Container>
        <div className="flex justify-center mb-4">
          {members.map((member, index) => (
            <RankCard nickname={member} index={index}></RankCard>
          ))}
        </div>
      </Section.Container>
    </Section>
  );
};

export default Ranking;
