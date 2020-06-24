import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/*
 * [x] Recebimento das Informações
 * [/] Tratativa de erros/exceções
 * [x] Acesso ao repositorio
 */

interface RequestDTO {
  provider: string;
  date: Date;
}

/*
 * Dependency Inversion
 */

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  // preciso falar que o parametro do construtor é a instancia da outra classe
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    // Regra de Negócio : agendamento só pode acontecer de 1 em 1 hora -
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
      // return response
      //  .status(400)
      //  .json({ message: 'This appointment is already booked' });
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
      // mais parametros aqui ( como argumentos so informa erro de quantidade de parâmetros )
    });

    return appointment;
  }
}

export default CreateAppointmentService;
