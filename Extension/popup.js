document.addEventListener('DOMContentLoaded', function () {
    // 페이지가 로드될 때 실행할 코드
    const AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize';
    const CLIENT_ID = '8f0485d786b3f5eba00e';
    const REDIRECT_URL = 'https://github.com/'; // 변경 필요
    const SCOPES = ['repo', 'admin:repo_hook', 'admin:org', 'admin:public_key', 'admin:org_hook', 'user', 'project'];
  
    function init() {
      // 초기화 코드
    }
  
    function login() {
      init(); // secure token params.
  
      let url = `${AUTHORIZATION_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=`;
  
      for (let i = 0; i < SCOPES.length; i++) {
        url += SCOPES[i];
      }
  
      chrome.storage.local.set({ pipe_cogit: true }, () => {
        // opening pipe temporarily
  
        chrome.tabs.create({ url, selected: true }, function () {
          window.close();
          chrome.tabs.getCurrent(function (tab) {
            // chrome.tabs.remove(tab.id, function () {});
          });
        });
      });
    }
  
    const loginButton = document.getElementById('github_login_button');
    loginButton.addEventListener('click', login);
  });