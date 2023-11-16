import React from 'react';
import LinkIcon from '@/icons/link.svg';
import { Section } from '@/components/Section';
import Link from 'next/link';
import SiteCard from './SiteCard';

const AlgoSite = () => {
  return (
    <Section className="w-[30%] h-full inline-block p-[20px] my-[20px] mr-[10px] ">
      <Section.Title>
        <LinkIcon width={36} height={36} />
        <p className="ml-2">Algorithm Site</p>
      </Section.Title>
      <Section.Container>
        <SiteCard url="https://www.acmicpc.net/" image="/images/BOJ.png" />
        <SiteCard
          url="https://school.programmers.co.kr/learn/challenges"
          image="/images/PROG.jpg"
        />
      </Section.Container>
    </Section>
  );
};

export default AlgoSite;
