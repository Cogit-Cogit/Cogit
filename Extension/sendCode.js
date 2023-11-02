function sendCode(
  codeContent,
  codeSolved,
  algorithmQuestPlatform,
  codeLanguage,
  codeRunningTime,
  algorithmQuestId,
  codeFileExtension
) {
  let jwt;
  chrome.storage.local.get('cogit', function (result) {
    const cogitData = result.cogit;

    if (cogitData === undefined) {
      console.log('코깃 데이터 없음');
      return;
    }

    jwt = cogitData.Authorization;
    if (jwt === undefined) {
      console.log('토큰 없음');
      return;
    }

    function executeRequestWithToken(token) {
      fetch('http://localhost:8080/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          algorithmQuestPlatform: algorithmQuestPlatform,
          algorithmQuestId: algorithmQuestId,
          codeContent: codeContent,
          codeSolved: codeSolved,
          codeRunningTime: codeRunningTime,
          codeLanguage: codeLanguage,
          codeFileExtension: codeFileExtension,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log(response.status);
            console.log(response);
            console.log(response.ok);
            return response.text();
          } else {
            console.log(response.status);
            if (response.status === 401) {
              refreshAccessToken()
                .then((newToken) => {
                  // 토큰을 갱신한 후에 새로운 토큰으로 요청을 다시 보냅니다.
                  executeRequestWithToken(newToken);
                })
                .catch((error) => {
                  throw new Error('토큰을 갱신하지 못했습니다.');
                });
            } else {
              throw new Error('코드를 전송하지 못했습니다.');
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    executeRequestWithToken(jwt);
  });
}
