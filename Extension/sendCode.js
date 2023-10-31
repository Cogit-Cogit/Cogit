function sendCode(
  codeContent,
  codeResult,
  algorithmQuestPlatform,
  codeLanguage,
  codeRunningTime,
  algorithmQuestId
) {
  let jwt;
  chrome.storage.local.get('cogit', function (result) {
    const cogitData = result.cogit;

    if (cogitData === undefined) {
      console.log('코깃 데이터 없음');
      return;
    }

    // console.log(cogitData);
    jwt = cogitData.RefreshToken;
    console.log(jwt);
    if (jwt === undefined) {
      console.log('토큰 없음');
      return;
    }

    fetch('http://localhost:8080/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: jwt,
      },
      body: JSON.stringify({
        algorithmQuestPlatform: algorithmQuestPlatform,
        algorithmQuestId: algorithmQuestId,
        codeContent: codeContent,
        codeResult: codeResult,
        codeRunningTime: codeRunningTime,
        codeLanguage: codeLanguage,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('코드르 전송하지 못했습니다.');
        }
      })
      .then((data) => {
        console.log(data);
      });
  });
}
