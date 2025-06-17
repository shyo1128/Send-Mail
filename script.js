// "Send" 버튼 클릭 시 실행되는 함수
document
  .getElementById('sendButton')
  .addEventListener('click', function (event) {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    // 입력값 가져오기
    const recipient = document.querySelector(
      'input[name="recipient"]:checked'
    ).value;
    const sendDate = document.getElementById('sendDate').value;
    const contents = document.getElementById('contents').value;

    // 데이터가 제대로 입력되었는지 확인
    if (!recipient || !sendDate || !contents) {
      alert('모든 필드를 채워주세요!');
      return; // 필수 입력 값이 없으면 전송하지 않음
    }

    // 서버로 데이터 전송 (POST 요청)
    fetch('/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, sendDate, contents }), // JSON 형태로 요청
    })
      .then((response) => response.json()) // 서버 응답을 JSON으로 파싱
      .then((data) => {
        alert('편지가 성공적으로 전송되었습니다!');
      })
      .catch((error) => {
        alert('이메일 전송에 실패했습니다. 다시 시도해주세요.');
        console.error('Error:', error);
      });
  });
