'use client';

import React from 'react';
import { Section } from '@/components/Section';
import CodeIcon from '@/icons/code.svg';
import SearchIcon from '@/icons/search.svg';
import PawIcon from '@/icons/paw.svg';
import { Input } from '@/components/Input';
import { CodeList } from './CodeList';
import CodeDetail from './CodeDetail';

function MyCode() {
  const isList = false;

  const myCodeList = [
    {
      codeId: 23,
      algorithmQuestId: 3,
      algorithmQuestPlatform: 'Baekjoon',
      createdAt: '2023-10-30',
      codeAnalyze: 'https://amazons3.northeastasia.com/cogit',
      codeLanguage: 'Java',
      codeRunningTime: 323.8,
      codeSolved: true,
    },
    {
      codeId: 23,
      algorithmQuestId: 3,
      algorithmQuestPlatform: 'Baekjoon',
      createdAt: '2023-10-30',
      codeAnalyze: 'https://amazons3.northeastasia.com/cogit',
      codeLanguage: 'Java',
      codeRunningTime: 323.8,
      codeSolved: true,
    },
    {
      codeId: 23,
      algorithmQuestId: 3,
      algorithmQuestPlatform: 'Baekjoon',
      createdAt: '2023-10-30',
      codeAnalyze: 'https://amazons3.northeastasia.com/cogit',
      codeLanguage: 'Java',
      codeRunningTime: 323.8,
      codeSolved: false,
    },
    {
      codeId: 23,
      algorithmQuestId: 3,
      algorithmQuestPlatform: 'Baekjoon',
      createdAt: '2023-10-30',
      codeAnalyze: 'https://amazons3.northeastasia.com/cogit',
      codeLanguage: 'Java',
      codeRunningTime: 323.8,
      codeSolved: true,
    },
    {
      codeId: 23,
      algorithmQuestId: 3,
      algorithmQuestPlatform: 'Baekjoon',
      createdAt: '2023-10-30',
      codeAnalyze: 'https://amazons3.northeastasia.com/cogit',
      codeLanguage: 'Java',
      codeRunningTime: 323.8,
      codeSolved: false,
    },
    {
      codeId: 23,
      algorithmQuestId: 3,
      algorithmQuestPlatform: 'Baekjoon',
      createdAt: '2023-10-30',
      codeAnalyze: 'https://amazons3.northeastasia.com/cogit',
      codeLanguage: 'Java',
      codeRunningTime: 323.8,
      codeSolved: false,
    },
  ];

  return (
    <div>
      {isList && (
        <Section className="h-[86vh] p-5">
          <Section.Title>
            <CodeIcon alt="CodeIcon" width={36} height={36} />
            <p className="ml-2">내 코드 보기</p>
          </Section.Title>
          <Section.Container>
            <Input className="w-[90%] px-3">
              <Input.Wrapper className="w-[30%]">
                <Input.Unit>
                  <SearchIcon alt="SearchIcon" width={30} height={30} />
                </Input.Unit>
                <Input.Section
                  name="codeSearch"
                  placeholder="문제번호로 검색하세요."
                  type="search"
                  className="w-full pb-2 ml-2 text-2xl"
                />
              </Input.Wrapper>
            </Input>
            <div className="w-[90%] h-[65vh] overflow-scroll flex flex-col items-center mt-5 scrollbar-hide">
              {myCodeList.map((mycode, idx) => (
                <CodeList key={idx} className="w-full p-3 border-b-2 border-gray-400">
                  <CodeList.QNum>
                    {mycode.codeSolved ? (
                      <PawIcon
                        width={28}
                        height={28}
                        stroke="#1CA80F"
                        fill="#1CA80F"
                        className="mr-1"
                      />
                    ) : (
                      <PawIcon
                        width={28}
                        height={28}
                        stroke="#FFA7A7"
                        fill="#FFA7A7"
                        className="mr-1"
                      />
                    )}
                    {mycode.algorithmQuestId}
                  </CodeList.QNum>
                  <CodeList.Platform>{mycode.algorithmQuestPlatform}</CodeList.Platform>
                  <CodeList.Language>{mycode.codeLanguage}</CodeList.Language>
                  <CodeList.RunningTime>{mycode.codeRunningTime} ms</CodeList.RunningTime>
                  <CodeList.CreatedAt>{mycode.createdAt}</CodeList.CreatedAt>
                </CodeList>
              ))}
            </div>
          </Section.Container>
        </Section>
      )}
      <CodeDetail></CodeDetail>
    </div>
  );
}

export default MyCode;
