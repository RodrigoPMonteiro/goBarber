import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

// use --> qualquer método que use a rota ( get, post...) vai usar a rota appointmentsRouter
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
