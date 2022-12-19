const { Router } = require('express');

const UsersController = require('../controllers/UsersController'); // Tem que ser importado do arquivo UsersController para instanciar aqui.

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRoutes = Router();

const usersController = new UsersController(); // Como ele é uma classe, é necessário instanciar, ou seja, alocar um espaço na memória para a classe.

usersRoutes.post('/', usersController.create); // Acessa o método "create" que foi criado no arquivo UsersController.
usersRoutes.put('/', ensureAuthenticated, usersController.update);

module.exports = usersRoutes;
