/* eslint-disable camelcase */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentServices';

const appoitmentsRouter = Router();
// const appointmentsRepository = new AppointmentsRepository();

// SoC: Separation of Concerns ( Separação de preocupações )
// Cada rota/repositorio/serviço tem que ter apenas 1 preocupação

// Cria rota de Listagem de Agendamentos
appoitmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  // repositorio tem responsabilidade de se comunicar com nossa fonte de DADOS
  const appointments = await appointmentsRepository.find(); // all();

  return response.json(appointments);
});

// Rota: Receber a req, chamar outro arquivo, devolver uma resposta

// Cria rota de Criação de Agendamentos
appoitmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date); // pega string e transforma em uma data

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message }); // Status para erros conhecidos;
  }
});

export default appoitmentsRouter;
