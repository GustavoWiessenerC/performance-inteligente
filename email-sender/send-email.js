const nodemailer = require('nodemailer');
const fs = require('fs');
const dotenv = require('dotenv');

async function main() {
  try {
    dotenv.config();

    const artifactPath = process.argv[2];
    const htmlReport = fs.readFileSync(artifactPath, 'utf-8');
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.KEY_GENERATE,
      },
    });

    const message = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT,
      subject: 'Relatório de Testes K6',
      html: htmlReport,
    };

    const info = await transporter.sendMail(message);
    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

main();
