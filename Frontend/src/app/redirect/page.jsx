'use client';
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/userSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function page() {
  const dispatch = useDispatch();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const sendCodeToBackend = async (code) => {
    const bearer = process.env.NEXT_PUBLIC_BEARER;
    try {
      const response = await fetch(`http://localhost:8080/auth/regist?code=${code}`, {
        // const response = await fetch(`https://cogit.kr/api/auth/regist?code=${code}`, {
        method: 'GET',
        // headers: {
        //   Authorization: `Bearer ${bearer}`,
        // },
      });
      console.log('response ====', response);
      if (response.ok) {
        console.log('로그인 백에다가 요청~~', response);
        const accessToken = response.headers.get('Authorization');
        const refreshToken = response.headers.get('RefreshToken');
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        console.log('저장된 accessToken ====== ', accessToken);
        //우리 메인페이지로 이동하고 싶다.
        response.json().then((res) => {
          localStorage.setItem('cogit_member', JSON.stringify(res.data));
          const loginInfo = JSON.parse(localStorage.getItem('cogit_member'));
          dispatch(
            login({
              id: loginInfo.memberId,
              name: loginInfo.memberName,
              nickname: loginInfo.memberNickname,
              gitUrl: loginInfo.memberGitUrl,
              profileImage: loginInfo.memberProfileImage,
              isLogin: true,
            }),
            console.log('after dispatch'),
          );
          console.log(res.data);
        });
      } else {
        console.error('Failed to authenticate');
      }
    } catch (error) {
      console.error('Error sending code to backend:', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('cogit')) {
      const cogit = JSON.parse(localStorage.getItem('cogit'));
      const memberInfo = JSON.parse(localStorage.getItem('cogit_member'));

      const accessToken = cogit.Authorization;
      const refreshToken = cogit.RefreshToken;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      dispatch(
        login({
          id: memberInfo.memberId,
          name: memberInfo.memberName,
          nickname: memberInfo.memberNickname,
          gitUrl: memberInfo.memberGitUrl,
          profileImage: memberInfo.memberProfileImage,
          isLogin: true,
        }),
      );

      redirect('/');
    } else {
      console.log(searchParams);
      const code = window.location.href.split('code=')[1];
      console.log('router.query===', code);
      if (code) {
        console.log('sendcodetobackend');
        sendCodeToBackend(code);

        redirect('/');
      }
    }
  }, []);
  return <div>로그인 중.....</div>;
}

export default page;
