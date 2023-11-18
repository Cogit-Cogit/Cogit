'use client';

import React, { useEffect, useState } from 'react';
import Ranking from './Ranking/Ranking';
import Schedule from './Schedule/Schedule';
import AlgoSite from './AlgoSite/AlgoSite';
import Button from '@/components/Button';
import SettingIcon from '@/icons/setting.svg';
import ExitIcon from '@/icons/exit.svg';
import GroupIcon from '@/icons/group.svg';
import MemberManagementModal from './Modal/MemberManagementModal';
import MemberAddModal from './Modal/MemberAddModal';
import MemberDeleteModal from './Modal/MemberDeleteModal';
import axios from '@/api/index';
import { useMemberState } from '@/app/MemberContext';
import { useSelector } from 'react-redux';
import Sidebar from '@/app/Sidebar';

function Group({ params }) {
  const [showMemberManagementModal, setMemberManagementModal] = useState(false);
  const [showMemberAddModal, setMemberAddModal] = useState(false);
  const [showMemberDeleteModal, setMemberDeleteModal] = useState(false);
  const userId = useSelector((state) => state.user.id);

  const { teamList } = useMemberState();

  const [teamInfo, setTeamInfo] = useState({
    teamId: '',
    teamName: '',
  });

  const [members, setMembers] = useState([]);

  const fetchTeamMember = async () => {
    const {
      data: { data },
    } = await axios.get(`/study/memberList?teamId=${params.id}`);
    setMembers(data);
  };

  const TeamInfo = () => {
    console.log(teamList);
    {
      teamList.map((team) => {
        console.log(team.id);
        if (team.id == params.id) {
          setTeamInfo({
            teamId: team.id,
            teamName: team.teamName,
          });
          return;
        }
      });
    }
  };

  const onClickMemberManagementModal = () => {
    setMemberManagementModal((prev) => !prev);
  };

  const onClickAddMember = () => {
    setMemberAddModal((prev) => !prev);
    setMemberManagementModal(false);
  };

  const onClickMemberDeleteModal = () => {
    setMemberDeleteModal((prev) => !prev);
  };

  const onClickDeleteMember = async () => {
    const {
      data: { data },
    } = await axios.delete(`/study/leave`, {
      data : {
        memberId: userId,
        teamId: teamInfo.teamId,
      },
    });

  };

  useEffect(() => {
    TeamInfo();
    fetchTeamMember();
    console.log(teamList);
  }, []);

  return (
    <div className="flex">
    <Sidebar />
    <div className="w-full bg-[#F4F6FA]">
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
          <Button
            className="p-1 mb-3 rounded-small bg-hover hover:bg-warning"
            onClick={onClickMemberDeleteModal}
            >
            <ExitIcon alt="exitIcon" width={36} height={36} />
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
            <MemberAddModal
            isOpen={showMemberAddModal}
            onClose={onClickAddMember}
            teamId={teamInfo.teamId}
            />
            )}
          {showMemberDeleteModal && (
            <MemberDeleteModal
            isOpen={showMemberDeleteModal}
            onClose={() => setMemberDeleteModal(false)}
            onClickDeleteMember={onClickDeleteMember}
            />
            )}
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Ranking teamId={params.id} />
      </div>
      <div className="flex justify-between w-full h-[500px]">
        <Schedule members={members} teamId={params.id} />
        <AlgoSite />
      </div>
    </div>
            </div>
          </div>
  );
}

export default Group;
