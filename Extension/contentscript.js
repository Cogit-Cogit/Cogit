const submitButton = document.getElementById('submit_button');
if (submitButton != null) {
  submitButton.addEventListener('click', function () {
    saveCode();
  });
}

// const radio = document.getElementById('code_open_close');
// if (radio != null) {
//   radio.addEventListener('change', function () {
//     saveCode();
//   });
// }

function saveCode() {
  // CodeMirror-line 클래스를 가지고 있는 모든 요소를 선택합니다.
  const codeMirrorLines = document.querySelectorAll('.CodeMirror-line');

  // 각 요소에 포함된 내용을 추출하여 배열에 저장합니다.
  const linesContent = Array.from(codeMirrorLines).map((line) => line.textContent);

  // 각 내용을 줄바꿈으로 연결합니다.
  const contentWithNewlines = linesContent.join('\n');

  // 결과를 출력하거나 다른 작업을 수행합니다.
  console.log(contentWithNewlines);

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
          sendCode(currentContent);
        }
        console.log(currentContent);
        preContent = currentContent; // 현재 내용을 저장
      }
    }, 2000);
  } else {
    console.log('이미 제출한 코드입니다.');
  }
}

function sendCode(textValue) {
  console.log(textValue);
  if (localStorage.getItem('code')) {
    var code = localStorage.getItem('code');

    fetch('http://localhost:8080/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        result: textValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}
