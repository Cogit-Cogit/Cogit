import React, { useState } from 'react';
import axios from '@/api/index';
import { Modal } from '@/components/Modal';
import Button from '@/components/Button';
import { Input } from '@/components/Input';

function AddTeam({ isOpen, onClose, fetchData }) {
  const [teamNameInput, setTeamNameInput] = useState(null);

  const onClickClose = () => {
    onClose();
  };

  const onClickAddTeam = async () => {
    await axios.post('/study/create', {
      studyName: teamNameInput,
    });
    fetchData();
    onClose();
  };

  const handleChange = (e) => {
    const inputTeamName = e.target.value;
    setTeamNameInput(inputTeamName);
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Dimmed>
        <Modal.Container className="bg-white" width="40vw" height="60vh">
          <Modal.Close onClick={onClickClose} />
          <Modal.Title>그룹 생성하기</Modal.Title>
          <div className="flex flex-col items-center h-[40vh] py-5 justify-between">
            <Input className="w-[80%] mt-10">
              <Input.Title>그룹 이름</Input.Title>
              <Input.Wrapper>
                <Input.Section
                  name="teamName"
                  placeholder="그룹 이름 입력"
                  type="input"
                  onChange={handleChange}
                />
              </Input.Wrapper>
            </Input>
            <Button
              className="w-1/2 text-2xl text-white h-1/10 mx-7 bg-primary rounded-large"
              onClick={onClickAddTeam}
            >
              생성하기
            </Button>
          </div>
        </Modal.Container>
      </Modal.Dimmed>
    </Modal>
  );
}

export default AddTeam;
