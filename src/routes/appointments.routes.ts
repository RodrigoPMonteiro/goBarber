import { Router } from 'express';
import { uuid } from 'uuidv4';

const appoitmentsRouter = Router();

const appointments = [];

appoitmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid,
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appoitmentsRouter;
