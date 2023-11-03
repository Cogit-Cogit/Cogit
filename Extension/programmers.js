const PLATFORM_URL =
  'https://school.programmers.co.kr/learn/courses/30/lessons/';

const submitButton = document.getElementById('submit-code');
if (submitButton != null) {
  submitButton.addEventListener('click', function () {
    saveCode();
  });
}

function saveCode() {
  let codeLanguage = document
    .getElementById('tour7')
    .querySelector('button')
    .textContent.trim();
  codeLanguage = programmersLanguages[codeLanguage];
  let codeFileExtension = programmersExtension[codeLanguage];

  const codeMirrorLines = document.querySelectorAll('.CodeMirror-line');
  const linesContent = Array.from(codeMirrorLines).map(
    (line) => line.textContent
  );
  const codeContent = linesContent.join('\n');

  let codeResult = document.querySelector('.modal-title');
  if (codeResult) {
    codeResult.textContent = '로딩중';
  }

  const intervalId = setInterval(function () {
    codeResult = document.querySelector('.modal-title').textContent;
    var codeRunningTime = 0;
    var algorithmQuestId = document
      .querySelector('div.main > div.lesson-content')
      .getAttribute('data-lesson-id');

    if (codeResult && !codeResult.includes('로딩중')) {
      clearInterval(intervalId);

      let result = false;

      if (codeResult.includes('정답')) {
        const timeElements = document.querySelectorAll(
          '.console-test-group td.result.passed'
        );
        const runTimes = [];

        for (var timeElement of timeElements) {
          var runTime = timeElement.innerText.match(/(\d+\.\d+)ms/);
          if (runTime) {
            runTimes.push(parseFloat(runTime[1]));
          }
        }
        codeRunningTime =
          runTimes.reduce((acc, value) => acc + value, 0) / runTimes.length;
        result = true;
      }

      sendCode(
        codeContent,
        result,
        'PROGRAMMERS',
        codeLanguage,
        codeRunningTime,
        algorithmQuestId,
        codeFileExtension,
        `${PLATFORM_URL}${algorithmQuestId}`
      );
    }
  }, 2000);
}
