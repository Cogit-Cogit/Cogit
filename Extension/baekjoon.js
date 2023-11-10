const PLATFORM_URL = 'https://www.acmicpc.net/problem/';

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

  let isActive = false;
  chrome.storage.local.get('active', function (result) {
    console.log(result.active);
    if (result.active) {
      if (result.active == 'active') {
        isActive = true;
      }
    }
  });

  if (preContent.includes('중')) {
    // 2초 간격으로 내용 확인
    const intervalId = setInterval(function () {
      chrome.storage.local.get('active', function (result) {
        if (result.active) {
          if (result.active == 'deactive') {
            clearInterval(intervalId); // setInterval 중지
          }
        }
      });
      solutionElements = document.querySelectorAll('[id^="solution-"]');
      firstSolutionElement = solutionElements[0];
      spanElement = firstSolutionElement.querySelector('span[data-color]');

      if (spanElement) {
        let currentContent = spanElement.textContent;

        if (currentContent === preContent && !currentContent.includes('중')) {
          clearInterval(intervalId); // setInterval 중지
          let codeLanguage = firstSolutionElement
            .querySelector('td:nth-child(7)')
            .querySelector('a')
            .textContent.trim();
          let codeFileExtension = baekjoonExtension[codeLanguage];
          codeLanguage = baekjoonLanguages[codeLanguage];
          let codeRunningTime = firstSolutionElement.querySelector('.time').textContent;
          let algorithmQuestId = firstSolutionElement
            .querySelector('td:nth-child(3)')
            .querySelector('a').textContent;

          if (localStorage.getItem('code')) {
            var code = localStorage.getItem('code');

            if (currentContent.includes('맞았습니다')) {
              sendCode(
                code,
                true,
                'BAEKJOON',
                codeLanguage,
                codeRunningTime,
                algorithmQuestId,
                codeFileExtension,
                `${PLATFORM_URL}${algorithmQuestId}`
              );
              var cogitImg = document.createElement('img');
              cogitImg.src = 'https://cogitusercode.s3.ap-northeast-2.amazonaws.com/cogit.PNG';
              cogitImg.style = 'width:20px';
              spanElement.appendChild(cogitImg);
            } else if (
              currentContent.includes('틀렸습니다') ||
              currentContent.includes('시간 초과') ||
              currentContent.includes('메모리 초과')
            ) {
              sendCode(
                code,
                false,
                'BAEKJOON',
                codeLanguage,
                codeRunningTime,
                algorithmQuestId,
                codeFileExtension,
                `${PLATFORM_URL}${algorithmQuestId}`
              );
            }
          }
        }
        preContent = currentContent; // 현재 내용을 저장
      }
    }, 2000);
  } else {
    console.log('코드를 전송하지 않았습니다.');
  }
}
