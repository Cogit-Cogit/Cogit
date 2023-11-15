'use client';

import RadioButton from '@/components/RadioButton';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './Sidebar';
import { useMemberState } from '@/app/MemberContext';

function MyPage({ params }) {
  const DynamicCalendar = dynamic(() => import('./Calendar'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });

  const nickname = params.id;

  const { teamList } = useMemberState();
  const { scheduleList } = useMemberState();

  return (
    <div className='flex'>
    <Sidebar />
    <div className="w-5/6 p-3 m-4 bg-white shadow-lg rounded-large">
      <div className="flex items-center">
        <div className="flex justify-center mb-1 text-2xl font-bold text-hover">
          {nickname}'s Calendar
        </div>
        <div className="flex justify-around pb-1">
          {teamList.map((team) => (
            <RadioButton key={team.id} text={team.teamName} className="mx-4" />
          ))}
        </div>
      </div>
      <DynamicCalendar scheduleList={scheduleList}/>
    </div>
    </div>
  );
}

export default MyPage;
