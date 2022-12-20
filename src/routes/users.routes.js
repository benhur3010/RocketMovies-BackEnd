const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController"); // Tem que ser importado do arquivo UsersController para instanciar aqui.
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController(); // Como ele é uma classe, é necessário instanciar, ou seja, alocar um espaço na memória para a classe.

const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create); // Acessa o método "create" que foi criado no arquivo UsersController.
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
