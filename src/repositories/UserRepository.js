const sqliteConnection = require("../database/sqlite");

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE email = (?)", [
      email
    ]);

    return user;
  }

  async create({
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
  }) {
    const database = await sqliteConnection();
    const userId = await database.run(
      "INSERT INTO users (name, email, password, register, phone, postalcode, street, streetNumber, neighborhood, city, uf, complement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
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
      ]
    );

    return { id: userId };
  }
}

module.exports = UserRepository;
