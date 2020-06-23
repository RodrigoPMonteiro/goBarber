import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// use --> qualquer método que use a rota ( get, post...) vai usar a rota appointmentsRouter
routes.use('/appointments', appointmentsRouter);

export default routes;
