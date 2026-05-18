require('dotenv').config();

const app = require('./app');

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs/`);
});
