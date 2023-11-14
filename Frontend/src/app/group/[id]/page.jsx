'use client';

import React, { useEffect, useState } from 'react';
import Ranking from './Ranking/Ranking';
import Schedule from './Schedule/Schedule';
import ToDoList from './ToDo/ToDoList';
import Button from '@/components/Button';
import SettingIcon from '@/icons/setting.svg';
import ExitIcon from '@/icons/exit.svg';
import GroupIcon from '@/icons/group.svg';
import MemberManagementModal from './Modal/MemberManagementModal';
import MemberAddModal from './Modal/MemberAddModal';
import axios from '@/api/index';

function Group({ params }) {
  const [showMemberManagementModal, setMemberManagementModal] = useState(false);
  const [showMemberAddModal, setMemberAddModal] = useState(false);
  const [teamInfo, setTeamInfo] = useState({
    teamId: '',
    teamName: '',
    scheduleList: [
      {
        scheduleId: '6',
        scheduleName: '',
        scheduleStartAt: '',
        scheduleEndAt: '',
      },
    ],
  });
  const teamId = params.id;
  const [members, setMembers] = useState([]);

  const fetchTeamMember = async () => {
    const {
      data: { data },
    } = await axios.get(`/study/memberList?teamId=${teamId}`);
    setMembers(data);
  };

  const fetchTeamInfo = async () => {
    const {
      data: { data },
    } = await axios.get(`/schedule/team?teamId=${teamId}`);
    setTeamInfo(data);
    console.log(teamInfo.scheduleList);
  };

  const onClickMemberManagementModal = () => {
    setMemberManagementModal((prev) => !prev);
  };

  const onClickAddMember = () => {
    setMemberAddModal((prev) => !prev);
    // setMemberManagementModal((prev) => !prev);
  };

  useEffect(() => {
    fetchTeamInfo();
    fetchTeamMember();
  }, []);

  return (
    <div className="m-7">
      <div className="flex justify-between">
        <div className="flex pt-3 pl-2">
          <GroupIcon width={36} height={36} />
          <div className="pl-2 text-2xl font-bold">{teamInfo.teamName}</div>
        </div>
        <div>
          <Button
            className="p-1 mb-3 mr-3 rounded-small bg-primary"
            onClick={onClickMemberManagementModal}
          >
            <SettingIcon alt="settingIcon" width={36} height={36} />
          </Button>
          <Button className="p-1 mb-3 rounded-small bg-hover hover:bg-warning">
            <ExitIcon alt="settingIcon" width={36} height={36} />
          </Button>
          {showMemberManagementModal && (
            <MemberManagementModal
              isOpen={showMemberManagementModal}
              onClose={() => setMemberManagementModal(false)}
              onClickAddMember={onClickAddMember}
              members={members}
            />
          )}
          {showMemberAddModal && (
            <MemberAddModal isOpen={showMemberAddModal} onClose={onClickAddMember} />
          )}
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Ranking />
      </div>
      <div className="flex justify-between w-full h-[500px]">
        <Schedule
          members={members}
          scheduleId={teamInfo.scheduleList[0].scheduleId}
          scheduleName={teamInfo.scheduleList[0].scheduleName}
        />
        <ToDoList />
      </div>
    </div>
  );
}

export default Group;
