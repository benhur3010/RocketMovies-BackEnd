const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
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
    const checkEmailExists = await this.userRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
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
    return userCreated;
  }
}

module.exports = UserCreateService;
