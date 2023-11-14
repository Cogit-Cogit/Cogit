import React, { useRef } from 'react';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import Button from '@/components/Button';

function MemberAddModal({ isOpen, onClose }) {
  const inputRef = useRef();

  const onClickClose = () => {
    onClose();
  };

  const onClickAddMember = async () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Dimmed>
        <Modal.Container className="text-center bg-white shadow-2xl" width="30vw" height="60vh">
          <Modal.Close onClick={onClickClose} />
          <Modal.Title>멤버 추가</Modal.Title>
          <div className="flex flex-row justify-between w-full">
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
            <Button className="w-1/3 text-white bg-hover rounded-small" onClick={onClickAddMember}>
              추가하기
            </Button>
          </div>
        </Modal.Container>
      </Modal.Dimmed>
    </Modal>
  );
}

export default MemberAddModal;
