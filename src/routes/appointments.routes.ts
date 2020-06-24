import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

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

// Cria rota de Criação de Agendamentos
appoitmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
    // mais parametros aqui ( como argumentos so informa erro de quantidade de parâmetros )
  });

  return response.json(appointment);
});

export default appoitmentsRouter;
