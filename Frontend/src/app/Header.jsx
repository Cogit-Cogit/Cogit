'use client';

import Profile from '@/components/User/Profile';
import Logo from '@/icons/logo.svg';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <nav className="flex items-center justify-between w-full p-4 bg-white drop-shadow-md h-[7vh]">
      <Link href="/">
        <Logo alt="코깃코깃" width={135} height={36} />
      </Link>
      {isLogin ? <Profile /> : null}
    </nav>
  );
}

export default Header;
