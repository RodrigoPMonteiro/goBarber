//
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

// DTO = Data Transfer Object

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }
@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  // <> --> parametro da tipagem
  // private appointments: Appointment[];

  // public all(): Appointment[] {
  //   return this.appointments;
  // }

  // constructor() {
  //   this.appointments = [];
  // }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );

    return findAppointment || null;
  }

  // public create({ provider, date }: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date }); // paramentro nomeados

  //   this.appointments.push(appointment);

  //   return appointment;
  // }
}

export default AppointmentRepository;
