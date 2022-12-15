- O Node.Js veio para permitir escreve JavaScript em um ambiente, fora do navegador.

- Node.Js utiliza v8 Engine, que é um interpretador JavaScript para melhorar a performance.

- npm = Node Package Manager. Pacote do node para instalação.

- Framework Express = serve para lidar com as requisições feitas na aplicação pelo cliente, de maneira a devolver respostas a quem solicitou. Requisições feitas através do protocolo http. Instalação feita através do "npm install express --save".

- Biblioteca nodemon. "npm install nodemon --save-dev". o "dev" serve para utilizar somente no ambiente dev. Faz com que o servidor fique reiniciando e aceitando as atualizações feitas no código.

- A lógica utilizando o Insomnia é: quando o "post" é feito, chega no server.js. As rotas estão sendo executadas pelo "app.use(routes)". Então ele é redirecionado para o index.js, que é onde a o server buscou informações. No index.js ele encontra a rota do usuário "routes.use("/users", usersRouter)". Quando identifica o /users, redireciona para o arquivo usersRouter. No usersRouter terão todas as rotas do usuário.

- Saindo das rotas, teremos os controllers, que serão as camadas responsáveis por processar as requisições, ou seja, a parte inteligente: verificar se o usuário existe, fazer o cadastro de um produto, etc.
O servidor é o ponto de entrada. Quando uma requisição chega nele, vai passar pelas rotas, que por sua vez irá identificar qual controller será utilizado.

- A biblioteca express-async-errors foi instalada para lidar com erros tantos do lado do cliente como do servidor.

- Instalação do banco relacional. "npm install sqlite3 sqlite --save".

- Para visualizar o banco de dados temos que usar uma SGBD: Sistema Gerenciador de Banco de Dados. Utilizei o Beekeeper.