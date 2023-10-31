function sendCode(
  codeContent,
  codeResult,
  algorithmQuestPlatform,
  codeLanguage,
  codeRunningTime,
  algorithmQuestId
) {
  fetch('http://localhost:8080/code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
}
