import React from 'react';
import classnames from 'classnames';

function SectionMain({ className, children }) {
  return <div className={classnames(`bg-white rounded-small`, className)}>{children}</div>;
}

function SectionTitle({ className, children }) {
  return <div className={classnames(`flex mb-4 text-2xl font-bold`, className)}>{children}</div>;
}

function SectionButtonContainer({ className, children }) {
  return <div className={classnames('justify-between', className)}>{children}</div>;
}

function SectionContainer({ children }) {
  return <>{children}</>;
}
export const Section = Object.assign(SectionMain, {
  Title: SectionTitle,
  ButtonList: SectionButtonContainer,
  Container: SectionContainer,
});
