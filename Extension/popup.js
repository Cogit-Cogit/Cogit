document.addEventListener("DOMContentLoaded", function () {
  // 페이지가 로드될 때 실행할 코드
  const AUTHORIZATION_URL = "https://github.com/login/oauth/authorize";
  const CLIENT_ID = "8f0485d786b3f5eba00e";
  const REDIRECT_URL = "https://github.com/"; // 변경 필요
  const SCOPES = [
    "repo",
    "admin:repo_hook",
    "admin:org",
    "admin:public_key",
    "admin:org_hook",
    "user",
    "project",
  ];

  function login() {
    let url = `${AUTHORIZATION_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=`;
    for (let i = 0; i < SCOPES.length; i++) {
      url += SCOPES[i];
    }

    chrome.storage.local.set({ pipe_cogit: true }, () => {
      // opening pipe temporarily

      chrome.tabs.create({ url, selected: true }, function () {
        window.close();
      });
    });
  }

  const loginButton = document.getElementById("authenticate");
  loginButton.addEventListener("click", login);

  chrome.storage.local.get("cogit", function (data) {
    if (data.cogit) {
      // cogit 인증 데이터가 존재하면, 로그인 버튼 숨김
      var authModeElement = document.getElementById("auth_mode");
      if (authModeElement) {
        authModeElement.style.display = "none";
      }
    }
  });
});
