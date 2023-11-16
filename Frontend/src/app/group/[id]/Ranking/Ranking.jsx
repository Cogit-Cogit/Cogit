'use client';

import React, { useState, useEffect } from 'react';
import { Section } from '@/components/Section';
import RankCard from './RankCard';
import RankingIcon from '@/icons/ranking.svg';
import axios from '@/api/index';

const Ranking = ({ teamId }) => {
  const [members, setMembers] = useState([]);

  const fetchTeamRanking = async () => {
    const {
      data: { data },
    } = await axios.get(`/study/member/ranking?teamId=${teamId}`);
    setMembers(data);
  };

  useEffect(() => {
    fetchTeamRanking();
  }, []);

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
          {members.map((member, idx) => (
            <RankCard
              nickname={member.memberName}
              url={member.memberProfileImage}
              key={idx}
              idx={idx}
            ></RankCard>
          ))}
        </div>
      </Section.Container>
    </Section>
  );
};

export default Ranking;
