require("express-async-errors"); // Para lidar com os erros.
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require("express"); // Criar uma variável que recolhe todas as dependências do express.
const routes = require("./routes"); // Importando as rotas do arquivo index de "routes".

migrationsRun(); // Para executar o banco de dados.

const app = express(); // Função que está inicializando o express.

app.use(cors());

app.use(express.json()); 

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes); 



app.use((error, request, response, next) => {

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

const PORT = 3333; 

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
