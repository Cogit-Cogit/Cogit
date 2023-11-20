import React, { useState } from 'react';
import { Input } from '@/components/Input';

function AddAlgorithmQuest({ index, handleChange }) {
  const [value, setValue] = useState('BOJ');

  const selectChange = (e) => {
    setValue(e.target.value);
    handleChange(e);
  };

  return (
    <Input className="w-full my-4">
      <Input.Title>문제 {index + 1} </Input.Title>
      <Input.Wrapper>
        <select
          name={`platform ${index}`}
          value={value}
          className="mr-5 text-center bg-primary rounded-small"
          onChange={selectChange}
        >
          <option value="BOJ" className="bg-white rounded-small">
            백준
          </option>
          <option value="PROG" className="bg-white rounded-small">
            프로그래머스
          </option>
        </select>
        <Input.Section
          name={`quest ${index}`}
          placeholder="문제 링크 입력"
          type="input"
          onChange={handleChange}
        />
      </Input.Wrapper>
    </Input>
  );
}

export default AddAlgorithmQuest;
