const nodemailer = require('nodemailer');
const fs = require('fs');
const dotenv = require('dotenv');
const reportTemplete = require('./templete');


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

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    const message = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT,
      subject: `Relatório de Testes de Performance K6 - ${formattedDate}`, 
      html: reportTemplete,
      attachments: [
        {
          filename: 'performance-inteligente.html', 
          content: htmlReport, 
        },
      ],
    };

    const info = await transporter.sendMail(message);
    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

main();
