import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentServices';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appoitmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// SoC: Separation of Concerns ( Separação de preocupações )
// Cada rota/repositorio/serviço tem que ter apenas 1 preocupação

// Cria rota de Listagem de Agendamentos
appoitmentsRouter.get('/', (request, response) => {
  // repositorio tem responsabilidade de se comunicar com nossa fonte de DADOS
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

// Rota: Receber a req, chamar outro arquivo, devolver uma resposta

// Cria rota de Criação de Agendamentos
appoitmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date); // pega string e transforma em uma data

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appoitmentsRouter;
