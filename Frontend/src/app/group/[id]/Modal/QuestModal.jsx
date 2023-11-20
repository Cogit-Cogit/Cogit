import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/Modal';
import Button from '@/components/Button';
import AddAlgorithmQuest from './AddAlgorithmQuest';
import PlusIcon from '@/icons/plus.svg';
import CloseIcon from '@/icons/close.svg';
import axios from '@/api/index';

const QuestModal = ({ isOpen, onClose, scheduleId, fetchSchduelQuest }) => {
  const [inputList, setInputList] = useState([
    {
      platform: 'BOJ',
      questNumber: '',
    },
  ]);

  const onClickClose = () => {
    onClose();
  };

  const fetchQuestAdd = async () => {
    const {
      data: { data },
    } = await axios.post(`/schedule/quest/add`, {
      scheduleId,
      algorithmQuestList: inputList,
    });
    fetchSchduelQuest(scheduleId);
  };

  const onClickAddQuest = () => {
    fetchQuestAdd();
    onClose();
  };

  const onCreate = () => {
    setInputList([
      ...inputList,
      {
        platform: 'BOJ',
        questNumber: '',
      },
    ]);
  };
  const onClickDelete = () => {
    setInputList([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const arr = name.split(' ');
    console.log(arr[0] + ' : ' + arr[1]);

    if (arr[0] == 'platform') {
      inputList[parseInt(arr[1])].platform = value;
      setInputList([...inputList]);
    } else {
      if (!isNaN(value)) {
        inputList[parseInt(arr[1])].questNumber = value;
        setInputList([...inputList]);
      } else {
        alert('숫자로 입력해주세요.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Dimmed>
        <Modal.Container className="bg-white" width="80vh" height="65vh">
          <Modal.Close onClick={onClickClose} />
          <div className="flex flex-col items-center h-full pb-3">
            <Modal.Title>문제 추가</Modal.Title>
            <div className="flex flex-row-reverse w-full">
              <Button
                className="p-3 mr-10 text-xl bg-primary hover:bg-warning w-1/7 rounded-small"
                onClick={onClickDelete}
              >
                <CloseIcon width={24} height={24} />
              </Button>
              <Button
                className="p-3 mr-1 text-xl w-1/7 bg-primary hover:bg-hover rounded-small"
                onClick={onCreate}
              >
                <PlusIcon width={24} height={24} />
              </Button>
            </div>
            <div className="w-11/12 h-[320px] overflow-auto scrollbar-default bg-white rounded-large mb-3">
              {inputList.map((quest, idx) => {
                return <AddAlgorithmQuest key={idx} index={idx} handleChange={handleChange} />;
              })}
            </div>
            <Button
              className="w-1/3 p-3 text-xl bg-primary hover:bg-hover rounded-small"
              onClick={onClickAddQuest}
            >
              추가하기
            </Button>
          </div>
        </Modal.Container>
      </Modal.Dimmed>
    </Modal>
  );
};

export default QuestModal;
