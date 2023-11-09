import React from 'react';
import classnames from 'classnames';

function CodeListMain({ children, className }) {
  return (
    <div
      className={classnames(
        'flex justify-between bg-transparent text-xl hover:bg-primary',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CodeListQNum({ children }) {
  return <div className="flex">{children}</div>;
}

function CodeListPlatform({ children }) {
  return <div className="">{children}</div>;
}

function CodeListLanguage({ children }) {
  return <div className="">{children}</div>;
}

function CodeListRunningTime({ children }) {
  return <div className="">{children}</div>;
}

function CodeListCreatedAt({ children }) {
  return <div className="">{children}</div>;
}

function CodeListAnalyze({ children }) {
  return <div className="">{children}</div>;
}

export const CodeList = Object.assign(CodeListMain, {
  QNum: CodeListQNum,
  Platform: CodeListPlatform,
  Language: CodeListLanguage,
  RunningTime: CodeListRunningTime,
  CreatedAt: CodeListCreatedAt,
  Analyze: CodeListAnalyze,
});
