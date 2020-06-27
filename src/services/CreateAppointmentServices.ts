/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/*
 * [x] Recebimento das Informações
 * [x] Tratativa de erros/exceções
 * [x] Acesso ao repositorio
 */

interface RequestDTO {
  provider_id: string;
  date: Date;
}

/*
 * Dependency Inversion
 */

class CreateAppointmentService {
  // private appointmentsRepository: AppointmentsRepository;

  // // preciso falar que o parametro do construtor é a instancia da outra classe
  // constructor(appointmentsRepository: AppointmentsRepository) {
  //   this.appointmentsRepository = appointmentsRepository;
  // }

  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    // Regra de Negócio : agendamento só pode acontecer de 1 em 1 hora -
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
      // return response
      //  .status(400)
      //  .json({ message: 'This appointment is already booked' });
    }

    const appointment = appointmentsRepository.create({
      // não precisa ser await
      provider_id,
      date: appointmentDate,
      // mais parametros aqui ( como argumentos so informa erro de quantidade de parâmetros )
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
