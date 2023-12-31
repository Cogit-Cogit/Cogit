import { createPortal } from 'react-dom';

import React from 'react';
import { useSelector } from 'react-redux';
import { convertNickName } from '@/util/nickname';

function ProfileMenu({ onClickEditNickname, onCloseMenu, onClickLogoutModal }) {
  const {nickname, profileImage, name} = useSelector((state) => state.user)
  const onClickEdit = () => {
    onClickEditNickname();
  };

  const onClickLogout = () => {
    onClickLogoutModal();
  };

  const onClickRepo = () => {
    window.open(`https://github.com/${name}/Algorithm_Study_With_Cogit`);
  };

  const onClickBackGround = () => {
    onCloseMenu();
  };

  return (
    <>
      <div className="absolute py-4 top-16 right-7 bg-background w-[370px] rounded-small shadow-lg z-50">
        <div className="mb-4 text-center">이메일</div>
        <div className="flex items-center justify-center mb-4">
          <div
            className="flex items-center justify-center w-16 h-16 text-xl font-bold text-white rounded-full"
            style={{
              background: '#8D6E63',
            }}
          >
            <img className='rounded-small' src={profileImage}></img>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-lg text-center">안녕하세요. {nickname}님</div>
        </div>
        <div>
          <button className="w-full p-2 hover:bg-hover" onClick={onClickEdit}>
            닉네임 변경
          </button>
          <button className="w-full p-2 hover:bg-hover" onClick={onClickRepo}>
            내 레포지토리
          </button>
          <button className="w-full p-2 hover:bg-warning" onClick={onClickLogout}>
            로그아웃
          </button>
        </div>
        {createPortal(
          <div className="fixed z-40 w-full h-full " onClick={onClickBackGround}></div>,
          document.body,
        )}
      </div>
    </>
  );
}

export default ProfileMenu;
