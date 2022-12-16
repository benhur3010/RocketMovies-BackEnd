// Criação automática de tabela.
const createUsers = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  register VARCHAR,
  phone VARCHAR,
  postalcode VARCHAR,
  street VARCHAR,
  streetnumber VARCHAR,
  neighborhood VARCHAR,
  complement VARCHAR,
  avatar VARCHAR NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

module.exports = createUsers;
