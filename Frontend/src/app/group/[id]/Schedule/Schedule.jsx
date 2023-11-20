import React, { useState, useEffect } from 'react';
import { Section } from '@/components/Section';
import TBody from './TBody';
import THead from './THead';
import Button from '@/components/Button';
import ScheduleIcon from '@/icons/schedule.svg';
import ScheduleModal from '../Modal/ScheduleModal';
import QuestModal from '../Modal/QuestModal';
import axios from '@/api/index';
import { useMemberState } from '@/app/MemberContext';

function Schedule({ members, teamId }) {
  const [showScheduleModal, setScheduleModal] = useState(false);
  const [showQuestModal, setQuestModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { scheduleList } = useMemberState();
  const [teamScheduleList, setTeamScheduleList] = useState(scheduleList);
  const [value, setValue] = useState();
  var scheduleId = 0;

  const onClickScheduleModal = () => {
    setScheduleModal((prev) => !prev);
  };
  const onClickQuestModal = () => {
    setQuestModal((prev) => !prev);
  };
  const onClickSelectSchedule = async (v) => {
    scheduleId = v;
    fetchSchduelQuest(v);
  };

  const fetchSchduelQuest = async (v) => {
    const {
      data: { data },
    } = await axios.get(`/schedule?scheduleId=${v}`);
    setQuestions(data);
  };

  const selectChange = (e) => {
    setValue(e.target.value);
    onClickSelectSchedule(e.target.value);
  };

  useEffect(() => {
    const filteredSchedules = scheduleList.filter((schedule) => schedule.teamId == teamId);
    setTeamScheduleList(filteredSchedules);
  }, []);

  useEffect(() => {
    if (teamScheduleList.length > 0) {
      setValue(teamScheduleList[0].id);
      onClickSelectSchedule(teamScheduleList[0].id);
    }
  }, [teamScheduleList]);

  return (
    <Section className="w-[70%] h-full m-0 shadow-lg">
      <div className="flex justify-between mb-2 h-[18%]">
        <Section.Title className="justify-between mt-3">
          <div className="flex">
            <ScheduleIcon width={32} height={32} />
            {teamScheduleList.length > 0 ? (
              <select
                name="selectSchedule"
                value={value}
                className="mr-5 text-xl text-center bg-white rounded-small"
                onChange={selectChange}
              >
                {teamScheduleList.map((teamschedule) => {
                  return (
                    <option value={teamschedule.id} className="bg-white rounded-small">
                      {teamschedule.title}
                    </option>
                  );
                })}
              </select>
            ) : (
              <div className="ml-2">일정이 없습니다</div>
            )}
          </div>
        </Section.Title>
        <Section.ButtonList className="flex items-center">
          <Button
            className="flex items-center p-5 m-1 h-[15%] bg-primary rounded-small"
            onClick={onClickQuestModal}
          >
            문제 추가
          </Button>
          {showQuestModal && (
            <QuestModal
              isOpen={showQuestModal}
              onClose={onClickQuestModal}
              scheduleId={value}
              fetchSchduelQuest={fetchSchduelQuest}
            />
          )}
          <Button
            className="flex items-center p-5 m-1 h-[15%] bg-primary rounded-small"
            onClick={onClickScheduleModal}
          >
            일정 추가
          </Button>
          {showScheduleModal && (
            <ScheduleModal
              isOpen={showScheduleModal}
              onClose={onClickScheduleModal}
              teamId={teamId}
            />
          )}
        </Section.ButtonList>
      </div>
      <Section.Container className="w-full h-[36vh] overflow-auto scrollbar-thin scrollbar-thumb-hover scrollbar-track-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {teamScheduleList.length > 0 ? (
          <table className="w-full h-full text-center">
            <THead questions={questions}></THead>
            <TBody questions={questions} members={members}></TBody>
          </table>
        ) : (
          <div>
            <img className="pt-10 m-10" src="/images/cogit_gray.png" width={60} height={60} />
            <div className="text-center">일정이 없습니다</div>
          </div>
        )}
      </Section.Container>
    </Section>
  );
}

export default Schedule;
