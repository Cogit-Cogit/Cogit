import React, { useRef, useState, useEffect } from 'react';
import { Modal } from '@/components/Modal';
import Button from '@/components/Button';
import MemberCard from './MemberCard';

function MemberManagementModal({ isOpen, onClose, onClickAddMember, members }) {
  const onClickAdd = () => {
    onClickAddMember();
  };

  const onClickClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Dimmed>
        <Modal.Container className="text-center bg-white shadow-2xl" width="50vw" height="90vh">
          <Modal.Close onClick={onClickClose} />
          <Modal.Title>멤버 관리</Modal.Title>
          <div className="my-4 flex flex-col items-center h-[80%] overflow-auto">
            <div className="grid grid-cols-4 my-4 gap-x-8">
              {members.map((member, idx) => {
                return <MemberCard nickname={member.memberName} key={idx} />;
              })}
            </div>
          </div>
          <Button
            className="justify-center w-1/3 p-3 text-xl bg-primary rounded-small"
            onClick={onClickAdd}
          >
            추가하기
          </Button>
        </Modal.Container>
      </Modal.Dimmed>
    </Modal>
  );
}

export default MemberManagementModal;
