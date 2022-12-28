const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const UserRepository = require("../repositories/UserRepository");
const sqliteConnection = require("../database/sqlite");
const UserCreateService = require("../services/UserCreateService");

class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password,
      register,
      phone,
      postalcode,
      street,
      streetNumber,
      neighborhood,
      city,
      uf,
      complement
    } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({
      name,
      email,
      password,
      register,
      phone,
      postalcode,
      street,
      streetNumber,
      neighborhood,
      city,
      uf,
      complement
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const {
      name,
      email,
      password,
      old_password,
      register,
      phone,
      postalcode,
      street,
      streetNumber,
      neighborhood,
      city,
      uf,
      complement
    } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id
    ]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    const userWithUpdatedRegister = await database.get(
      "SELECT * FROM users WHERE register = (?)",
      [register]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    if (userWithUpdatedRegister && userWithUpdatedRegister.id !== user.id) {
      throw new AppError("Este CPF já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.register = register ?? user.register;
    user.phone = phone ?? user.phone;
    user.postalcode = postalcode ?? user.postalcode;
    user.street = street ?? user.street;
    user.streetNumber = streetNumber ?? user.streetNumber;
    user.neighborhood = neighborhood ?? user.neighborhood;
    user.city = city ?? user.city;
    user.uf = uf ?? user.uf;
    user.complement = complement ?? user.complement;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha."
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `UPDATE users SET name = ?, 
      email = ?, 
      password = ?,
      register = ?,
      phone = ?,
      postalcode = ?,
      street = ?,
      streetNumber = ?,
      neighborhood = ?,
      city = ?,
      uf = ?,
      complement = ?, 
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [
        user.name,
        user.email,
        user.password,
        user.register,
        user.phone,
        user.postalcode,
        user.street,
        user.streetNumber,
        user.neighborhood,
        user.city,
        user.uf,
        user.complement,
        user_id
      ]
    );

    return response.json();
  }
}

module.exports = UsersController;
