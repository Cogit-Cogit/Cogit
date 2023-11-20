import React from 'react';
import { Modal } from '../Modal';
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/userSlice';
import { useRouter } from 'next/navigation';

function LogoutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

    const onClickLogout = () => {
        dispatch(logout());
        onClose();
        router.push('/');
    };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Dimmed>
        <Modal.Container className="w-1/4 bg-background">
          <Modal.Close onClick={onClose} />
          <Modal.Title className="mb-7">로그아웃 하시겠습니까?</Modal.Title>
          <Modal.ButtonList className="justify-around pt-10">
            <Button
              className="items-center w-1/3 gap-1 p-5 bg-hover rounded-small"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              className="items-center w-1/3 gap-1 p-5 bg-warning rounded-small"
              onClick={onClickLogout}
            >
              확인
            </Button>
          </Modal.ButtonList>
        </Modal.Container>
      </Modal.Dimmed>
    </Modal>
  );
}

export default LogoutModal;
