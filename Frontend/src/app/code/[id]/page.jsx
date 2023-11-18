'use client';

import { Section } from '@/components/Section';
import React, { useState, useEffect } from 'react';
import CodeIcon from '@/icons/code.svg';
import CommentIcon from '@/icons/comment.svg';
import HomeIcon from '@/icons/home.svg';
import Comment from './Comment';
import Button from '@/components/Button';
import axios from '@/api/index';
import Sidebar from '@/app/Sidebar';
import { useRouter } from 'next/navigation';

function Code({params}) {
  const [codeDetail, setCodeDetail] = useState({
    codeId:0,
    algorithmQuestId:0,
    algorithmQuestPlatform:'',
    memberId: 0,
    codeContent: '',
    createAt: '',
    codeAnalyze: '',
    codeLanguage: '',
    codeRunningTime: 0.0,
    codeSolved: false
  });

  const [codeLine, setCodeLine] = useState([]);
  const [codeActive, setCodeActive] = useState(-1);

  const router = useRouter();


  const toggleActive = (e) => {
    setCodeActive((prev) => {
      if (prev == e.target.value) {
        return -1;
      }
      return e.target.value;
    });
  };

  const onClickComment = (e) => {
    console.log(e)
    setCodeActive(e);
  }

  const fetchGetCode = async () => {
    const {
      data: { data },
    } = await axios.get(`/code/detail?codeId=${params.id}`);
    setCodeDetail(data);
  };

  const registerComment = async (contents) => {
    await axios.post(`/code/detail/comment`, {
      codeId:params.id,
      commentLineNumber:codeActive,
      commentContent:contents,
    });
  };

  const moveToHome = () => {
    router.push('/')
  }
  useEffect(() => {
    fetchGetCode();
  }, []);

  useEffect(() => {
    setCodeLine(codeDetail.codeContent.split('\n'));
  }, [codeDetail]);

  return (
    <div className="flex">
    <Sidebar />
    <div className="w-full bg-[#F4F6FA]">
    <div className="flex justify-center">
      <Section className="h-[86vh] w-[50vw] p-5">
        <Section.Title className="justify-between">
          <div className="flex">
            <CodeIcon alt="CodeIcon" width={36} height={36} />
            <p className="ml-2">코드</p>
          </div>
          <Button className="p-1 rounded-small bg-primary" onClick={moveToHome}>
            <HomeIcon alt="homeIcon" width={36} height={36} />
          </Button>
        </Section.Title>
        <div className="h-[80%]">
          <div className="h-full mr-6 overflow-auto">
            {codeLine.map((code, idx) => {
              return (
                <button
                  value={idx}
                  className={
                    'flex ml-6 w-[95%] text-left  hover:bg-background' +
                    (idx == codeActive ? ' bg-hover' : '')
                  }
                  onClick={toggleActive}
                >
                  <div className="mr-6">{idx + 1}</div>
                  {code}
                </button>
              );
            })}
          </div>
        </div>
      </Section>
      <Section className="h-[86vh] w-[30vw] p-5">
        <Section.Title>
          <CommentIcon alt="CodeIcon" width={36} height={36} />
          <p className="ml-2">댓글</p>
        </Section.Title>
        <Section.Container>
          <Comment codeId={params.id} registerComment={registerComment} onClickComment={onClickComment}/>
        </Section.Container>
      </Section>
    </div>
    </div>
    </div>
  );
}

export default Code;
