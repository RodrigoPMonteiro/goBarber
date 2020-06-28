/* eslint-disable no-shadow */
import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();
// const appointmentsRepository = new AppointmentsRepository();

// SoC: Separation of Concerns ( Separação de preocupações )
// Cada rota/repositorio/serviço tem que ter apenas 1 preocupação

// Rota: Receber a req, chamar outro arquivo, devolver uma resposta

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user }); // só para funcionar
  } catch (err) {
    return response.status(400).json({ error: err.message }); // Status para erros conhecidos;
  }
});

export default sessionsRouter;
