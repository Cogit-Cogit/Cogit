'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function page({ searchParams }) {
  const pathname = usePathname();
  const router = useRouter();
  // const searchParams = useSearchParams();
  useEffect(() => {
    console.log('searchParams ==== ', searchParams.code);

    const code = searchParams.code;
    console.log('router.query===', code);
    if (code) {
      console.log('sendcodetobackend');
      sendCodeToBackend(code);
    }
  }, [router]);

  const sendCodeToBackend = async (code) => {
    localStorage.setItem('test', 'abcd');
    const bearer = process.env.NEXT_PUBLIC_BEARER;
    try {
      // const response = await fetch(`http://localhost:8080/auth/regist?code=${code}`);
      const response = await fetch(`http://localhost:8080/auth/regist?code=${code}`, {
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
        router.push('/');
      } else {
        console.error('Failed to authenticate');
      }
    } catch (error) {
      console.error('Error sending code to backend:', error);
    }
  };

  return <div>Redirecting...</div>;
}

export default page;
