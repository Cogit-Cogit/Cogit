'use client';

import React, { use, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyPage from './mypage/[id]/page';
import { useMemberDispatch, useMemberState } from '@/app/MemberContext';
import axios from '@/api/index';

export default function Home() {
  // const isLogin = useSelector((state) => state.user.isLogin);
  const isLogin = true;
  const dispatch = useMemberDispatch();
  const colorPalette = ['#B02BFF', '#FF127C', '#FFBB19', '#ADE600', '#00A6FF', '#00C6A1'];

  if (isLogin) {
    const [teamList, setTeamList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);

    const fetchData = async () => {
      const {
        data: { data },
      } = await axios.get('/schedule/myStudy/');

      console.log(data);

      setTeamList((prevTeamList) => [
        ...prevTeamList,
        ...data.map(({ teamId, teamName }) => ({
          id: teamId,
          teamName,
        })),
      ]);

      setScheduleList((prevScheduleList) => [
        ...prevScheduleList,
        ...data.flatMap(({ teamId, teamName, scheduleList }) =>
          scheduleList.map(({ scheduleId, scheduleName, scheduleStartAt, scheduleEndAt }) => ({
            id: scheduleId,
            calendarId: 'qweqwe',
            title: scheduleName,
            category: 'allday',
            start: scheduleStartAt,
            end: scheduleEndAt,
            color: 'white',
            backgroundColor: colorPalette[(teamId % colorPalette.length)],
          })),
        ),
      ]);
    };

    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      dispatch({
        type: 'SET_TEAMLIST',
        teamList: teamList,
      });
      console.log(teamList);
    }, [teamList]);

    useEffect(() => {
      dispatch({
        type: 'SET_SCHEDULELIST',
        scheduleList: scheduleList,
      });
      console.log(scheduleList);
    }, [scheduleList]);

    return (
      <>
        <div className="w-full bg-[#F4F6FA]">
          <MyPage params={{ id: 'test' }} />
        </div>
      </>
    );
  } else {
    return <div className="w-full bg-[#F4F6FA] h-[93vh]"></div>;
  }
}
