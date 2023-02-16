import { Router } from 'express';
import CarsController from '../Controllers/CarController';
import MotoController from '../Controllers/motoControllers';

const routes = Router();

const motoPathById = '/motorcycles/:id';
const carPathById = '/cars/:id';

routes.post(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).create(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).getAllCars(),
);

routes.get(
  carPathById,
  (req, res, next) => new CarsController(req, res, next).getCarById(),
);

routes.put(
  carPathById,
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
  motoPathById,
  (req, res, next) => new MotoController(req, res, next).getMotoById(),
);

routes.put(
  motoPathById,
  (req, res, next) => new MotoController(req, res, next).reversalRequest(),
);

routes.delete(
  motoPathById,
  (req, res, next) => new MotoController(req, res, next).deleteMotoById(),
);

routes.delete(
  carPathById,
  (req, res, next) => new CarsController(req, res, next).deleteCarById(),
);

export default routes;