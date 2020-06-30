import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);

// const appointmentsRepository = new AppointmentsRepository();

// SoC: Separation of Concerns ( Separação de preocupações )
// Cada rota/repositorio/serviço tem que ter apenas 1 preocupação

// Rota: Receber a req, chamar outro arquivo, devolver uma resposta

// Cria rota de Criação de Agendamentos
usersRouter.post('/', async (request, response) => {
//  try {
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
//  } catch (err) {
//   return response.status(400).json({ error: err.message }); // Status para erros conhecidos;
//  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request,response) =>{
  //  try{
      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({
        user_id: request.user.id ,
        avatarFilename: request.file.filename, 
      });

      delete user.password;
      
      return response.json({ user })
  //  } catch(err){
  //    return response.status(400).json({ error: err.message }); // Status para erros conhecidos;
  //  }
  } 
); // patch porque quero atualizar uma unica informação do usuário

export default usersRouter;
