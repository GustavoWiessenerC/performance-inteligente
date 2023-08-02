
const reportTemplete = ` 

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Relatório de Testes Inteligente</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e1e1e1;
      border-radius: 4px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4CAF50;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .content {
      padding: 20px;
    }
    .footer {
      background-color: #f2f2f2;
      padding: 10px;
      text-align: center;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .button {
      display: inline-block;
      background-color: #4CAF50;
      color: #ffffff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
    }
    .button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Relatório de Testes Automatizados de Performance</h1>
    </div>
    <div class="content">
      <p>Olá,</p>
      <p>Aqui está o relatório de testes K6 gerado para melhores análises de desempenho.</p>
      <p>O relatório contém informações detalhadas sobre os testes de performance realizados.</p>
      <p>Por favor, veja o relatório completo em anexo.</p>
      <p>Se você estiver passando por problemas técnicos, entre em contato com o time de suporte.</p>
      
    </div>
    <div class="footer">
      <p>Este e-mail foi enviado automaticamente. Por favor, não responda.</p>
    </div>
  </div>
</body>
</html>
`

module.exports = reportTemplete;