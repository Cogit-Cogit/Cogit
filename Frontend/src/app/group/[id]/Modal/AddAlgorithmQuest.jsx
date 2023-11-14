import React from 'react';
import { Input } from '@/components/Input';

function AddAlgorithmQuest({ index }) {
  return (
    <Input className="w-full my-4">
      <Input.Title>문제 {index + 1} </Input.Title>
      <Input.Wrapper className="justify-between">
        <Input.Section name="firstInvestmentAmount" placeholder="문제 링크 입력" type="input" />
      </Input.Wrapper>
    </Input>
  );
}

export default AddAlgorithmQuest;
