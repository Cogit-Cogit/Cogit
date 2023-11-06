import './globals.css';
import localFont from 'next/font/local';
import Header from './Header';
import Sidebar from './Sidebar';

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

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={tMoney.className}>
      <body>
        <Header />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
