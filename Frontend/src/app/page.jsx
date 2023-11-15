'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyPage from './mypage/[id]/page';
import { useMemberDispatch } from '@/app/MemberContext';
import axios from '@/api/index';
import Login from './login/page';

export default function Home() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const nickname = useSelector((state) => state.user.nickname);

  const dispatch = useMemberDispatch();

  const colorPalette = ['#B02BFF', '#FF127C', '#FFBB19', '#ADE600', '#00A6FF', '#00C6A1'];
  const [teamList, setTeamList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);

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
          backgroundColor: colorPalette[teamId % colorPalette.length],
        })),
      ),
    ]);
  };

  useEffect(() => {
    if (isLogin) {
      fetchData();
    }
  }, [isLogin]);

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

  if (isLogin) {
    return (
      <>
        <div className="w-full bg-[#F4F6FA]">
          <MyPage params={{ id: nickname }} />
        </div>
      </>
    );
  } else {
    return (
      <div className="w-full bg-[#F4F6FA] h-[93vh]">
        <Login />
      </div>
    );
  }
}
