'use client';

import React, { useState } from 'react';
import { Section } from '@/components/Section';
import CodeIcon from '@/icons/code.svg';
import SearchIcon from '@/icons/search.svg';
import PawIcon from '@/icons/paw.svg';
import { Input } from '@/components/Input';
import { CodeList } from './CodeList';
import CodeDetail from './CodeDetail';

function MyCode() {
  const isList = true;
  const [Operator, setOperator] = useState({
    algorithmQuestNumber: '',
    platform: '',
    page: 0,
  });
  const [myCodeList, setMyCodeList] = useState([]);
  const [value, setValue] = useState();

  const fetchFindCode = async () => {
    const {
      data: { data },
    } = await axios.get(
      `/code/my-history?algorithmQuestNumber=${Operator.algorithmQuestNumber}&platform=${Operator.platform}&page=${Operator.page}`,
    );
    setMyCodeList(data);
  };

  const onChange = (e) => {
    setOperator((prev) => ({ ...prev, platform: e.target.value }));
  };

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
              <Input.Wrapper className="w-[70%]">
                <select
                  value={value}
                  className="mr-5 text-center bg-primary rounded-small"
                  onChange={onChange}
                >
                  <option value={value} className="bg-white rounded-small">
                    백준
                  </option>
                  <option value={value} className="bg-white rounded-small">
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
