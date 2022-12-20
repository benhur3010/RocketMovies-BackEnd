require("express-async-errors"); // Para lidar com os erros.
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require("express"); // Criar uma variável que recolhe todas as dependências do express.
const routes = require("./routes"); // Importando as rotas do arquivo index de "routes".

migrationsRun(); // Para executar o banco de dados.

const app = express(); // Função que está inicializando o express.

app.use(cors()); //Backend atender as requisições do FrontEnd.

app.use(express.json()); // Serve para saber que as requisições serão feitas no padrão json.

// Usado para capturar as imagens e exibir quando buscada no backend.
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes); // Executa as rotas.

// Request é receber uma requisição e o response é a resposta fornecida.

app.use((error, request, response, next) => {
  // Se o erro for do lado do cliente:
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

const PORT = 3333; // Variável que armazena o endereço que o express irá atender.

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); // Irá rodar o servidor.
