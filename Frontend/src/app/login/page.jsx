import React from 'react';
import GitHubLoginButton from './GitHubLoginButton';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/images/cogit.png" alt="Cogit" className="mb-4" />
      <GitHubLoginButton />
    </div>
  );
}
