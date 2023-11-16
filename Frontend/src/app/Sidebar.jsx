'use client';

import Button from '@/components/Button';
import React, { useEffect, useState } from 'react';
import PlusIcon from '@/icons/plus.svg';
import { useMemberState } from '@/app/MemberContext';
import { useSelector } from 'react-redux';
import { useMemberDispatch } from '@/app/MemberContext';
import Link from 'next/link';
import AddTeam from './AddTeam';
import axios from '@/api/index';

function Sidebar() {
  const dispatch = useMemberDispatch();
  const { teamList } = useMemberState();
  const nickname = useSelector((state) => state.user.nickname);

  const [showAddTeam, setShowAddTeam] = useState(false);
  const [updateTeamList, setUpdateTeamList] = useState([]);

  const onClickAddTeam = () => {
    setShowAddTeam(true);
  };

  const fetchTeamList = async () => {
    const {
      data: { data },
    } = await axios.get('/schedule/my-study/');

    const uniqueTeamList = data
      .map(({ teamId, teamName }) => ({
        id: teamId,
        teamName,
      }))
      .filter((team) => !teamList.some((existingTeam) => existingTeam.id === team.id));

    dispatch({
      type: 'SET_TEAMLIST',
      teamList: [...teamList, ...uniqueTeamList],
    });
  };

  useEffect(() => {
    setUpdateTeamList(teamList);
  }, [dispatch]);

  useEffect(() => {
    setUpdateTeamList(teamList);
  }, [teamList]);

  return (
    <>
      <div className="flex flex-col w-1/6 h-[93vh] px-3 pl-3 border-r-2 border-gray-400 bg-background">
        <div className="flex flex-col">
          <div className="pt-5 mx-auto text-2xl font-black pb-7">{nickname}의 코깃</div>
          <div className="w-4/5 mx-auto border-t-2 border-lightgray" />
          <div className="flex flex-row justify-between w-full pt-5 text-xl font-bold flex-start">
            그룹
            <Button onClick={onClickAddTeam}>
              <PlusIcon width={24} height={24} />
            </Button>
          </div>
          {updateTeamList.map((team) => (
            <Button className="py-3 my-1 text-xl rounded-large hover:bg-hover" key={team.id}>
              <Link href={`/group/${team.id}`}>{team.teamName}</Link>
            </Button>
          ))}
          <Button className="py-3 my-1 text-xl rounded-large hover:bg-hover">
            <Link href="/mycode">내 코드보기</Link>
          </Button>
          <Button className="py-3 my-1 text-xl rounded-large hover:bg-hover">
            <Link
              href="https://chromewebstore.google.com/detail/%EC%BD%94%EA%B9%83%EC%BD%94%EA%B9%83-%EC%9D%B5%EC%8A%A4%ED%85%90%EC%85%98/cmjbobieohgjhfflhokcdfnhinmphojk?hl=ko"
              target="_blank"
            >
              익스텐션 사용하기
            </Link>
          </Button>
        </div>
      </div>
      {showAddTeam && (
        <AddTeam
          isOpen={showAddTeam}
          onClose={() => setShowAddTeam(false)}
          fetchData={fetchTeamList}
        />
      )}
    </>
  );
}

export default Sidebar;
