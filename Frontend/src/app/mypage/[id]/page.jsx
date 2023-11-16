'use client';

import RadioButton from '@/components/RadioButton';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useMemberState } from '@/app/MemberContext';

function MyPage({ params }) {
  const DynamicCalendar = dynamic(() => import('./Calendar'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });

  const nickname = params.id;

  const { teamList } = useMemberState();
  const { scheduleList: originalScheduleList } = useMemberState();

  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);

  const scheduleList = selectedTeamId
    ? originalScheduleList.filter((schedule) => schedule.teamId === selectedTeamId)
    : originalScheduleList;

  const handleRadioButtonClick = (teamId) => {
    if (clickedButton === teamId) {
      setSelectedTeamId(null);
      setClickedButton(null);
    } else {
      setSelectedTeamId(teamId);
      setClickedButton(teamId);
    }
  };

  return (
    <div className="flex">
      <Sidebar nickname={nickname} />
      <div className="w-5/6 p-3 m-4 bg-white shadow-lg rounded-large">
        <div className="flex items-center">
          <div className="flex justify-center mb-1 text-2xl font-bold text-hover">
            {nickname}'s Calendar
          </div>
          <div className="flex justify-around pb-1">
            {teamList.map((team) => (
              <RadioButton
                key={team.id}
                text={team.teamName}
                className="mx-4"
                onClick={() => handleRadioButtonClick(team.id)}
                isClicked={clickedButton === team.id}
              />
            ))}
          </div>
        </div>
        <DynamicCalendar scheduleList={scheduleList} />
      </div>
    </div>
  );
}

export default MyPage;
