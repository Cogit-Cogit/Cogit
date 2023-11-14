import React from 'react';
import { Section } from '@/components/Section';
import ToDo from './ToDo';
import ListIcon from '@/icons/list.svg';

const memos = ['메모입니다', '메모입니다2', '메모입니다3'];

const ToDoList = () => {
  return (
    <Section className="w-[40%] h-full inline-block p-[20px] my-[20px] mr-[10px]">
      <Section.Title>
        <ListIcon width={36} height={36} />
        <p className="ml-2">ToDo</p>
      </Section.Title>
      <Section.Container>
        {memos.map((memo, idx) => {
          return <ToDo memo={memo} key={idx} />;
        })}
      </Section.Container>
    </Section>
  );
};

export default ToDoList;
