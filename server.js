const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// body-parser 미들웨어 설정 (JSON 데이터 처리)
app.use(bodyParser.json());

// POST 요청을 받기 위한 라우트 설정
app.post('/send-email', (req, res) => {
  const { recipient, sendDate, contents } = req.body;

  // 이메일 보내는 설정 (Gmail SMTP 예시)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shyo1128@gmail.com', // 본인 Gmail 계정
      pass: 'tmdgyWkd!', // 앱 비밀번호 (나중에 설정해야 함)
    },
  });

  // 이메일 내용 설정
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: recipient === 'toHer' ? 'shyo1128@gmail.com' : 'shyo1128@gmail.com', // 수신자 설정
    subject: '오늘 하고 싶은 말은... 지금 확인해보세요!❤️',
    text: contents,
  };

  // 이메일 전송
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('이메일 전송에 실패했습니다.');
    }
    res.status(200).send('이메일이 성공적으로 전송되었습니다!');
  });
});

// 서버 포트 설정
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});
