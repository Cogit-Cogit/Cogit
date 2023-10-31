const submitButton = document.getElementById('submit_button');
if (submitButton != null) {
  submitButton.addEventListener('click', function () {
    saveCode();
  });
}

function saveCode() {
  const codeMirrorLines = document.querySelectorAll('.CodeMirror-line');

  const linesContent = Array.from(codeMirrorLines).map((line) => line.textContent);

  const contentWithNewlines = linesContent.join('\n');

  localStorage.setItem('code', contentWithNewlines);
}

let solutionElements = document.querySelectorAll('[id^="solution-"]');

let preContent = '';
if (solutionElements.length > 0) {
  let firstSolutionElement = solutionElements[0];
  let spanElement = firstSolutionElement.querySelector('span[data-color]');
  preContent = spanElement.textContent;
  console.log(preContent);
  if (
    preContent.includes('채점 중') ||
    preContent.includes('기다리는 중') ||
    preContent.includes('채점 준비 중') ||
    preContent.includes('중')
  ) {
    // 2초 간격으로 내용 확인
    const intervalId = setInterval(function () {
      solutionElements = document.querySelectorAll('[id^="solution-"]');
      firstSolutionElement = solutionElements[0];
      spanElement = firstSolutionElement.querySelector('span[data-color]');

      if (spanElement) {
        let currentContent = spanElement.textContent;

        if (currentContent === preContent && !currentContent.includes('중')) {
          clearInterval(intervalId); // setInterval 중지
          let codeLanguage = firstSolutionElement
            .querySelector('td:nth-child(7)')
            .querySelector('a').textContent;
          let codeRunningTime = firstSolutionElement.querySelector('.time').textContent;
          let algorithmQuestId = firstSolutionElement
            .querySelector('td:nth-child(3)')
            .querySelector('a').textContent;

          if (localStorage.getItem('code')) {
            var code = localStorage.getItem('code');

            if (
              currentContent.includes('맞았습니다') ||
              currentContent.includes('틀렸습니다') ||
              currentContent.includes('시간 초과') ||
              currentContent.includes('메모리 초과')
            ) {
              sendCode(
                code,
                currentContent,
                'Baekjoon',
                codeLanguage,
                codeRunningTime,
                algorithmQuestId
              ) == true;

              console.log('return true');
              if (currentContent.includes('맞았습니다')) {
                var cogitImg = document.createElement('img');
                cogitImg.src =
                  'https://hexagonal-locket-e6a.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffcee80a5-143a-4e25-9abf-0bcf3a18847d%2Fa1d3c27d-0fc6-41af-bc21-21ea7ef1cdd1%2FUntitled.png?table=block&id=3b2ecac2-d9d7-4e8a-8276-ab83a0fb876f&spaceId=fcee80a5-143a-4e25-9abf-0bcf3a18847d&width=2000&userId=&cache=v2';
                cogitImg.style = 'width:20px';
                spanElement.appendChild(cogitImg);
              }
            }
          }
        }
        preContent = currentContent; // 현재 내용을 저장
      }
    }, 2000);
  } else {
    console.log('이미 제출한 코드입니다.');
  }
}
