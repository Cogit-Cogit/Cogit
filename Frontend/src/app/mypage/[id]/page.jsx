'use client';

import RadioButton from '@/components/RadioButton';
import dynamic from 'next/dynamic';
import React from 'react';

function MyPage({ params }) {
  const DynamicCalendar = dynamic(() => import('./Calendar'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });

  const nickname = params.id;

  const GroupList = ['하얀마음 109', '그룹 2', '그룹 3'];

  return (
    <div className="p-3 bg-white m-7 rounded-small">
      <div className="flex items-center">
        <div className="flex justify-center mb-1 text-2xl font-bold text-hover">
          {nickname}'s Calendar
        </div>
        <div className="flex justify-around pb-1">
          {GroupList.map((group, idx) => (
            <RadioButton key={idx} text={group} className="mx-4" />
          ))}
        </div>
      </div>
      <DynamicCalendar />
    </div>
  );
}

export default MyPage;
