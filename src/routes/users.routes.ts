import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
// const appointmentsRepository = new AppointmentsRepository();

// SoC: Separation of Concerns ( Separação de preocupações )
// Cada rota/repositorio/serviço tem que ter apenas 1 preocupação

// Rota: Receber a req, chamar outro arquivo, devolver uma resposta

// Cria rota de Criação de Agendamentos
usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    // se tem regra de negócio, vai criar um novo Service

    delete user.password;

    return response.json(user); // só para funcionar
  } catch (err) {
    return response.status(400).json({ error: err.message }); // Status para erros conhecidos;
  }
});

export default usersRouter;
