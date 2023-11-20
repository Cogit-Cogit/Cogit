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
    <Section className="w-full p-5 m-0">
      <Section.Title>
        <div className="flex">
          <RankingIcon width={32} height={32} />
          <p className="ml-2 text-xl">랭킹</p>
        </div>
      </Section.Title>
      <Section.Container>
        <div className="flex justify-center mb-4">
          {members.map((member, idx) => (
            <RankCard
              nickname={member.memberNickname}
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
