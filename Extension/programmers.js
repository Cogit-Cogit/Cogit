const submitButton = document.getElementById('run-code');
if (submitButton != null) {
  submitButton.addEventListener('click', function () {
    saveCode();
  });
}

function saveCode() {
  const codeMirrorLines = document.querySelectorAll('.CodeMirror-line');

  // 각 요소에 포함된 내용을 추출하여 배열에 저장합니다.
  const linesContent = Array.from(codeMirrorLines).map((line) => line.textContent);

  // 각 내용을 줄바꿈으로 연결합니다.
  const contentWithNewlines = linesContent.join('\n');

  console.log(contentWithNewlines);
}
