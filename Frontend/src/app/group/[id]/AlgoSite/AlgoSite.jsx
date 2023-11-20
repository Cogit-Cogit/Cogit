import React from 'react';
import LinkIcon from '@/icons/link.svg';
import { Section } from '@/components/Section';
import Link from 'next/link';
import SiteCard from './SiteCard';

const AlgoSite = () => {
  return (
    <Section className="w-[30%] h-full m-0 ml-3 shadow-lg">
      <Section.Title>
        <LinkIcon width={32} height={32} />
        <p className="ml-2 text-xl">Algorithm Site</p>
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
