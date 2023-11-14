import React, { useState, useEffect } from 'react';
import { Section } from '@/components/Section';
import TBody from './TBody';
import THead from './THead';
import Button from '@/components/Button';
import ScheduleIcon from '@/icons/schedule.svg';
import ScheduleModal from '../Modal/ScheduleModal';
import QuestModal from '../Modal/QuestModal';
import axios from '@/api/index';

const Schedule = ({ members, scheduleId, scheduleName }) => {
  const [showScheduleModal, setScheduleModal] = useState(false);
  const [showQuestModal, setQuestModal] = useState(false);
  const [questions, setQuestions] = useState([]);

  const onClickScheduleModal = () => {
    setScheduleModal((prev) => !prev);
  };
  const onClickQuestModal = () => {
    setQuestModal((prev) => !prev);
  };

  const fetchSchduelQuest = async () => {
    const {
      data: { data },
    } = await axios.get(`/schedule?scheduleId=${scheduleId}`);
    setQuestions(data);
  };

  useEffect(() => {
    fetchSchduelQuest();
  }, []);

  return (
    <Section className="w-[60%] h-full inline-block p-[20px] my-[20px] mr-[10px] overflow-auto">
      <div className="flex justify-between mb-3">
        <Section.Title className="justify-between mt-3">
          <div className="flex">
            <ScheduleIcon width={36} height={36} />
            <p className="ml-2">{scheduleName}</p>
          </div>
        </Section.Title>
        <Section.ButtonList>
          <Button
            className="items-center p-5 m-1 bg-primary rounded-small"
            onClick={onClickQuestModal}
          >
            문제 추가
          </Button>
          {showQuestModal && <QuestModal isOpen={showQuestModal} onClose={onClickQuestModal} />}
          <Button
            className="items-center p-5 m-1 bg-primary rounded-small"
            onClick={onClickScheduleModal}
          >
            일정 추가
          </Button>
          {showScheduleModal && (
            <ScheduleModal isOpen={showScheduleModal} onClose={onClickScheduleModal} />
          )}
        </Section.ButtonList>
      </div>
      <Section.Container>
        <table className="w-[90%] text-center m-auto">
          <THead questions={questions}></THead>
          <TBody questions={questions} members={members}></TBody>
        </table>
      </Section.Container>
    </Section>
  );
};

export default Schedule;
