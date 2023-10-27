// url 인가코드 파싱
function parseAccessCode(url) {
  if (url.match(/\?error=(.+)/)) {
    // TODO: 오류 알림을 띄우고 창을 닫아야함
    return null;
  } else {
    // eslint-disable-next-line
    const accessCode = url.match(/\?code=([\w\/\-]+)/);
    if (accessCode) {
      return accessCode[1];
    }
  }
}

// 코깃코깃 서비스 로그인
function requestCogitLogin(code) {
  console.log("parameter", code);

  fetch(`http://localhost:8080/member/github?code=${code}`, {
    method: "GET",
  }).then((response) => {
    // 응답헤어 로큰 익스텐션 로컬스토리지 저장
    console.log(response.headers.get("Authorization"));
    chrome.storage.local.set(
      {
        cogit: {
          Authorization: response.headers.get("Authorization"),
          RefreshToken: response.headers.get("RefreshToken"),
        },
      },
      () => {
        // 저장 되었는지 확인
        chrome.storage.local.get("cogit", (data) => {
          console.log(data);
        });
        window.close();
      }
    );
  });
}

/* Check for open pipe */
if (window.location.host === "github.com") {
  const link = window.location.href;
  chrome.storage.local.get("pipe_cogit", (data) => {
    if (data && data.pipe_cogit) {
      const code = parseAccessCode(link);
      if (code != null) {
        requestCogitLogin(code);
      }

      chrome.storage.local.remove("pipe_cogit");
    }
  });
}
