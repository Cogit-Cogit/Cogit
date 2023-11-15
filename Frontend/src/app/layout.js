import React from 'react';
import localFont from 'next/font/local';
<<<<<<< HEAD
import Header from './Header';
import { ProviderWrapper } from '@/redux/ProviderWrapper';
import { MemberProvider } from './MemberContext';
=======
>>>>>>> b16ebcb (feat: / uri page.jsx 추가)

const tMoney = localFont({
  src: [
    {
      path: '../assets/fonts/TmoneyRoundWindRegular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/TmoneyRoundWindExtraBold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata = {
  title: '코깃코깃',
  description: 'Generated by create next app',
};

// const RootLayoutClient = dynamic(() => import('./layout.client.js'), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={tMoney.className}>
      <body>
        <ProviderWrapper>
          <MemberProvider>
            <Header />
            <div>{children}</div>
          </MemberProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}
