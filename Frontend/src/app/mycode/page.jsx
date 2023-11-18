'use client';

import React, { useState, useEffect } from 'react';
import { Section } from '@/components/Section';
import CodeIcon from '@/icons/code.svg';
import SearchIcon from '@/icons/search.svg';
import PawIcon from '@/icons/paw.svg';
import { Input } from '@/components/Input';
import { CodeList } from './CodeList';
import Button from '@/components/Button';
import axios from '@/api/index';
import Moment from 'moment';
import Link from 'next/link';
import Sidebar from '@/app/Sidebar';

function MyCode() {
  const isList = true;
  const [Operator, setOperator] = useState({
    algorithmQuestNumber: '',
    platform: 'BAEKJOON',
    page: 0,
  });
  const [myCodeList, setMyCodeList] = useState([]);
  const [value, setValue] = useState();

  const fetchFindCode = async () => {
    const {
      data: { data },
    } = await axios.get(
      `/code/my-history?questId=${Operator.algorithmQuestNumber}&platform=${Operator.platform}&page=${Operator.page}`,
    );
    setMyCodeList(data);
  };

  const fetchFindAllCode = async () => {
    const {
      data: { data },
    } = await axios.get(
      `/code/my-all-history?page=${Operator.page}`,
    );
    setMyCodeList(data);
  };

  const searchMyCode = () => {
    fetchFindCode()
  }

  const onChange = (e) => {
    setOperator((prev) => ({ ...prev, platform: e.target.value }));
  };

  const searchSpace = (e) => {
    if (!isNaN(e.target.value)) {
      setOperator((prev) => ({ ...prev, algorithmQuestNumber: e.target.value }));
    } else {
      alert('숫자로 입력해주세요.');
    }
  };

  useEffect(() => {
    fetchFindAllCode();
  }, []);

  return (
    <div className="flex">
    <Sidebar />
    <div className="w-full bg-[#F4F6FA]">
      {isList && (
        <Section className="h-[86vh] p-5">
          <Section.Title>
            <CodeIcon alt="CodeIcon" width={36} height={36} />
            <p className="ml-2">내 코드 보기</p>
          </Section.Title>
          <Section.Container>
            <Input className="w-[70%] px-3">
              <Input.Wrapper className="w-full ">
                <select
                  value={value}
                  className="mr-5 text-center bg-primary rounded-small"
                  onChange={onChange}
                >
                  <option value='BAEKJOON' className="bg-white rounded-small">
                    백준
                  </option>
                  <option value='PROGRAMMERS' className="bg-white rounded-small">
                    프로그래머스
                  </option>
                </select>
                <Input.Unit>
                  <SearchIcon alt="SearchIcon" width={30} height={30} />
                </Input.Unit>
                <Input.Section
                  name="codeSearch"
                  placeholder="문제번호로 검색하세요."
                  type="search"
                  className=" pb-2 ml-2 text-2xl"
                  onChange={searchSpace}
                />
              <Button className="ml-4 w-1/4 text-white bg-hover rounded-small" onClick={searchMyCode}>검색하기</Button>
              </Input.Wrapper>
            </Input>
            <div className="w-[90%] h-[65vh] overflow-scroll flex flex-col items-center mt-5 scrollbar-hide">
              {myCodeList.map((mycode, idx) => (
                <Link className="w-full" href={`/code/${mycode.codeId}`}>
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
                      {mycode.algorithmQuestNumber}
                    </CodeList.QNum>
                    <CodeList.Platform>{mycode.algorithmQuestPlatform}</CodeList.Platform>
                    <CodeList.Language>{mycode.codeLanguage}</CodeList.Language>
                    <CodeList.RunningTime>{Math.ceil(mycode.codeRunningTime)} ms</CodeList.RunningTime>
                    <CodeList.CreatedAt>{Moment(mycode.createAt).format('YYYY-MM-DD')}</CodeList.CreatedAt>
                  </CodeList>
                </Link>
              ))}
            </div>
          </Section.Container>
        </Section>
      )}
    </div>
    </div>
  );
}

export default MyCode;
