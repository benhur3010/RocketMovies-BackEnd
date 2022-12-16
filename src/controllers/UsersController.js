const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite');

// É utilizado a classe ao invés da função porque ela permite a criação e acesso de várias funções.
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
      streetnumber,
      neighborhood,
      complement
    } = request.body;

    const database = await sqliteConnection();

    const checkEmailExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    const checkRegisterExists = await database.get(
      'SELECT * FROM users WHERE register = (?)',
      [register]
    );

    if (checkEmailExists) {
      throw new AppError('Este e-mail já está em uso.');
    }

    if (checkRegisterExists) {
      throw new AppError('Este CPF já está em uso.');
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      'INSERT INTO users (name, email, password, register, phone, postalcode, street, streetnumber, neighborhood, complement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        email,
        hashedPassword,
        register,
        phone,
        postalcode,
        street,
        streetnumber,
        neighborhood,
        complement
      ]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este e-mail já está em uso.');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir a nova senha.'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere');
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `UPDATE users SET name = ?, 
      email = ?, 
      password = ?, 
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );

    return response.json();
  }
}

module.exports = UsersController;
