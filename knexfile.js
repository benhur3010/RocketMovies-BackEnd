const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    // Funcionalidade para executar no momento em que estabelecer conexão com o banco de dados. Esse função está habilitando deletar em cascata, ou seja, quando deletar uma nota, consequentemente deletará as tags relacionadas àquela nota.
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      )
    },
    useNullAsDefault: true
  }
};
