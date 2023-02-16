import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.CreateCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAllCars() {
    const allCars = await this.service.getAllCars();
    return this.res.status(200).json(allCars);
  }
  
  public async getCarById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getById(id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async reversalRequest() {
    const carUpt: ICar = {
      ...this.req.body,
    };
    const { id } = this.req.params;
    try {
      const car = await this.service.updateById(id, carUpt);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteCarById() {
    const { id } = this.req.params;
    try {
      await this.service.deleteById(id);
      return this.res.status(204).json();
    } catch (error) {
      this.next(error);
    }
  }
}
  
export default CarsController;