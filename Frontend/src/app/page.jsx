'use client';
import React, { use, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyPage from './mypage/[id]/page';
import { useMemberDispatch, useMemberState } from '@/app/MemberContext';
import axios from '@/api/index';
import { useRouter } from 'next/navigation';

export default function Home() {
  // const isLogin = useSelector((state) => state.user.isLogin);
  const [isLoaded, setisLoaded] = useState(false);
  const router = useRouter();
  const dispatch = useMemberDispatch();
  const colorPalette = ['#B02BFF', '#FF127C', '#FFBB19', '#ADE600', '#00A6FF', '#00C6A1'];
  const [teamList, setTeamList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null) {
      router.push('/login');
    } else {
      setisLoaded(true);
    }
  }, []);

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

  useEffect(() => {
    if (isLoaded) {
      fetchData();
    }
  }, [isLoaded]);

  return (
    <>
      {isLoaded ? (
        <>
          <div className="w-full bg-[#F4F6FA]">
            <MyPage params={{ id: 'test' }} />
          </div>
        </>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}
