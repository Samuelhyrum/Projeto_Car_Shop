import { Router } from 'express';
import CarsController from '../Controllers/CarController';
import MotoController from '../Controllers/motoControllers';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).create(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).getAllCars(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).getCarById(),
);

routes.put(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).reversalRequest(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotoController(req, res, next).create(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotoController(req, res, next).getAllMotos(),
);

routes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotoController(req, res, next).getMotoById(),
);

routes.put(
  '/motorcycles/:id',
  (req, res, next) => new MotoController(req, res, next).reversalRequest(),
);
export default routes;