import React from 'react';
import { Modal } from '@/components/Modal';
import Button from '@/components/Button';

function MemberDeleteModal({ isOpen, onClose, onClickDeleteMember }) {
  const onClickDelete = () => {
    onClickDeleteMember();
    onClose();
  };

  const onClickClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Dimmed>
        <Modal.Container className="text-center bg-white shadow-2xl" width="50vw" height="35vh">
          <Modal.Close onClick={onClickClose} />
          <Modal.Title>스터디 탈퇴</Modal.Title>
          <div className='text-warning mt-10 mb-14 text-lg'>정말로 스터디를 탈퇴 하시겠습니까?</div>
          <Button
            className="justify-center w-1/3 p-3 text-xl bg-disabled hover:bg-warning rounded-small"
            onClick={onClickDelete}
          >
            탈퇴하기
          </Button>
        </Modal.Container>
      </Modal.Dimmed>
    </Modal>
  );
}

export default MemberDeleteModal;
