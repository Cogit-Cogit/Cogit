import React, { useState } from 'react';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import Button from '@/components/Button';

function ScheduleModal({ isOpen, onClose }) {
  const onClickClose = () => {
    onClose();
  };
  const onClickAddSchedule = () => {
    onClose();
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <Modal isOpen={isOpen}>
      <Modal.Dimmed>
        <Modal.Container className="bg-white" width="80vh" height="60vh">
          <Modal.Close onClick={onClickClose} />
          <div className="flex flex-col items-center">
            <Modal.Title>일정 추가</Modal.Title>
            <div className="flex flex-col items-center justify-center w-11/12 h-[340px] bg-white mt-3 rounded-large mb-3">
              <Input className="w-full">
                <Input.Title>일정 이름</Input.Title>
                <Input.Wrapper className="justify-between">
                  <Input.Section
                    name="firstInvestmentAmount"
                    placeholder="일정 이름 입력"
                    type="input"
                  />
                </Input.Wrapper>
              </Input>
              <div className="flex justify-center">
                <Input className="w-2/5 mx-3 mt-10">
                  <Input.Title>시작일</Input.Title>
                  <Input.Wrapper className="justify-between">
                    <Input.Date
                      startDate={startDate}
                      endDate={endDate}
                      isStart={true}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Input.Wrapper>
                </Input>
                <Input.Unit className="mt-16">~</Input.Unit>
                <Input className="w-2/5 mx-3 mt-10">
                  <Input.Title>종료일</Input.Title>
                  <Input.Wrapper className="justify-between">
                    <Input.Date
                      startDate={startDate}
                      endDate={endDate}
                      mindate={startDate}
                      isStart={false}
                      onChange={(date) => setEndDate(date)}
                    />
                  </Input.Wrapper>
                </Input>
              </div>
            </div>
            <Button
              className="justify-center w-1/3 p-3 text-xl bg-primary rounded-small"
              onClick={onClickAddSchedule}
            >
              추가하기
            </Button>
          </div>
        </Modal.Container>
      </Modal.Dimmed>
    </Modal>
  );
}

export default ScheduleModal;
