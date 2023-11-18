import React, { useRef } from 'react';
import { Modal } from '../Modal';
import { Input } from '../Input';
import Button from '../Button';
import axios from '@/api/index';
import { useDispatch } from 'react-redux';
import { updateNickname } from '@/redux/userSlice';

function EditNickname({ isOpen, onClose }) {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const onClickClose = () => {
    onClose();
  };

  const onClickChangeNickname = async () => {
    fetchNickname();
    onClose();
    alert('닉네임이 변경 되었습니다.')
  };

  const fetchNickname = async () => {
    const newNickname = inputRef.current.value;

    const {
      data: { data },
    } = await axios.patch(`/member/nickname`, {
      memberNickname:newNickname
    });

    dispatch(updateNickname({nickname:newNickname}));
  };

  return (
    <Modal isOpen={isOpen}>
    <Modal.Dimmed>
      <Modal.Container className="shadow-2xl bg-background" width="30vw" height="50vh">
        <Modal.Close onClick={onClickClose} />
        <div className="flex flex-col items-center justify-between w-full h-1/2">
          <Modal.Title>닉네임 변경</Modal.Title>
          <div className="flex flex-row w-full justify-between">
            <Input>
              <Input.Wrapper className="w-full">
                <Input.Section
                  name="nickname"
                  placeholder="닉네임"
                  type="input"
                  className="w-full"
                  ref={inputRef}
                ></Input.Section>
              </Input.Wrapper>
            </Input>
            <Button
              className="text-white bg-hover rounded-small w-1/3"
              onClick={onClickChangeNickname}
            >
              확인
            </Button>
          </div>
        </div>
      </Modal.Container>
      </Modal.Dimmed>
    </Modal>
  );
}

export default EditNickname;
