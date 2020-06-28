import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AutenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const usersRespository = getRepository(User);

    const user = await usersRespository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // user.password = senha criptografada
    // password = Senha não-criptografada

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    // Usuario autenticado
    return {
      user,
    };
  }
}

export default AutenticateUserService;
