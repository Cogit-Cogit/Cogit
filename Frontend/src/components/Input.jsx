import React, { forwardRef, useState } from 'react';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

import 'react-datepicker/dist/react-datepicker.css';

function InputMain({ children, className }) {
  return (
    <div className={classnames('bg-transparent', className)}>
      <div className="flex flex-col px-5 py-1">{children}</div>
    </div>
  );
}

function InputTitle({ children, className }) {
  return <div className={classnames('text-sm text-black', className)}>{children}</div>;
}

function InputWrapper({ children, className }) {
  return (
    <div className={classnames('flex flex-row mt-1 border-b-2 border-gray-400', className)}>
      {children}
    </div>
  );
}

const InputSection = forwardRef(function InputSection(
  { name, placeholder, type, value, onChange, className },
  ref,
) {
  return (
    <input
      className={classnames(
        'pb-1 mr-1 text-xl font-semibold text-black bg-transparent placeholder-hover focus:outline-0 focus:placeholder-transparent',
        className,
      )}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      ref={ref}
    ></input>
  );
});

function InputUnit({ children, className }) {
  return (
    <div className={classnames('pb-1 text-xl font-semibold text-black bg-transparent', className)}>
      {children}
    </div>
  );
}
function InputDate({ startDate, endDate, isStart, mindate, onChange }) {
  return (
    <div className="flex justify-between">
      <DatePicker
        className="pb-1 mr-1 text-xl font-semibold bg-transparent text-hover "
        selected={isStart ? startDate : endDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate={mindate}
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
      />
    </div>
  );
}

export const Input = Object.assign(InputMain, {
  Title: InputTitle,
  Wrapper: InputWrapper,
  Section: InputSection,
  Unit: InputUnit,
  Date: InputDate,
});
