import GitHubLoginButton from '../GitHubLoginButton';
export default function Login() {
  return (
    <div>
      <div className="flex flex-col items-center h-screen w-screen">
        <img src="/images/cogit_CI.png" alt="cogit_CI" className="mt-20 mb-5 w-1/2 h-24" />
        <p className="text-3xl mb-20">코드 리뷰 공유 캘린더</p>
        <img src="/images/cogit_Logo.png" alt="cogit_Logo" className="mb-10 h-1/6" />
        <GitHubLoginButton />
      </div>
    </div>
  );
}
