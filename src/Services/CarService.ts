// src/Services/TransferService.ts

import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import HttpException from '../Middlewares/HttpException';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(
        car,
      );
    }
    return null;
  }

  public async CreateCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const carODM = new CarODM();
    const cars = await carODM.findAllCar();
    const carArray = cars.map((car) =>
      this.createCarDomain(car));
    return carArray;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    if (!car) {
      throw new HttpException(404, 'Car not found');
    }
    const carArray = this.createCarDomain(car);
    return carArray;
  }

  public async updateById(id: string, carUpt: ICar) {
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    if (!car) {
      throw new HttpException(404, 'Car not found');
    }
    const newIdOfCar = await carODM.update(id, carUpt);

    return this.createCarDomain(newIdOfCar);
  }
}

export default CarService;