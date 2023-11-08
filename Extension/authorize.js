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
  console.log('parameter', code);

  fetch(`http://localhost:8080/auth/regist?code=${code}`, {
    method: 'GET',
  }).then((response) => {
    console.log(response);
    // 응답헤어 로큰 익스텐션 로컬스토리지 저장
    console.log(response.headers.get('Authorization'));
    chrome.storage.local.set(
      {
        cogit: {
          Authorization: response.headers.get('Authorization'),
          RefreshToken: response.headers.get('RefreshToken'),
        },
      },
      () => {
        // 저장 되었는지 확인
        chrome.storage.local.get('cogit', (data) => {
          console.log(data);
        });
        // window.close();
      }
    );
  });
  chrome.storage.local.remove('pipe_cogit');
}

/* Check for open pipe */
if (
  window.location.host === 'github.com' &&
  window.location.href.includes('?code=')
) {
  const link = window.location.href;
  chrome.storage.local.get('pipe_cogit', (data) => {
    if (data && data.pipe_cogit) {
      const code = parseAccessCode(link);
      if (code != null) {
        requestCogitLogin(code);
      }
    }
  });
}

function refreshAccessToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('cogit', function (result) {
      const cogitData = result.cogit;

      if (!cogitData || !cogitData.RefreshToken) {
        console.log('리프레시 토큰이 없습니다.');
        reject('리프레시 토큰이 없습니다.');
        return;
      }

      const refreshToken = cogitData.RefreshToken;

      fetch('http://localhost:8080/auth/refresh', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          RefreshToken: refreshToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('리프레시 토큰 요청에 실패했습니다.');
          }
          console.log(response);

          const newAuthorization = response.headers.get('Authorization');

          chrome.storage.local.set(
            {
              cogit: {
                ...cogitData,
                Authorization: newAuthorization,
              },
            },
            () => {
              // 저장되었는지 확인
              chrome.storage.local.get('cogit', (data) => {
                console.log(data);
                resolve(newAuthorization); // Promise에 새로운 토큰 반환
              });
            }
          );
        })
        .catch((error) => {
          console.error(error);
          reject(error); // Promise 실패
        });
    });
  });
}
