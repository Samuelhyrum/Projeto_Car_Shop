import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Icar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Deveria criar um novo carro', function () {
  it('Deveria criar um carro com sucesso ', async function () {
    // Arrange
    const carInput: Icar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car(
      {
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.CreateCar(carInput);

    expect(result).to.be.deep.equal(carOutput);
    sinon.restore();
  });
  describe('Testando o metodo Get ', function () {
    const inputArray = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    it('Deveria trazer um array de carros', async function () {
    // Arrange
      const carOutput: Car[] = inputArray.map((car) => new Car(car));
      sinon.stub(Model, 'find').resolves(carOutput);
    
      const service = new CarService();
      const result = await service.getAllCars();
    
      expect(result).to.be.deep.equal(carOutput);
      sinon.restore();
    });

    it('Deveria trazer um carro', async function () {
      // Arrange
      const carOutput : Car = new Car(
        {
          id: '634852326b35b59438fbea2f',
          model: 'Marea',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.99,
          doorsQty: 4,
          seatsQty: 5,
        },
      );
      sinon.stub(Model, 'findOne').resolves(carOutput);
        
      const service = new CarService();
      const result = await service.getById('634852326b35b59438fbea2f');
        
      expect(result).to.be.deep.equal(carOutput);
      sinon.restore();
    });
    it('Erro ao passar id invalido ', async function () {
      // Arrange
      const carOutput : Car = new Car(
        {
          id: '634852326b35b59438fbea2f',
          model: 'Marea',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.99,
          doorsQty: 4,
          seatsQty: 5,
        },
      );
      sinon.stub(Model, 'findOne').resolves(carOutput);
               
      try {
        const service = new CarService();
        await service.getById('WRONG ID');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      } sinon.restore();
    });
    it('Erro ao passar id inexistente ', async function () {
      // Arrange
      
      sinon.stub(Model, 'findOne').resolves(false);
                 
      try {
        const service = new CarService();
        await service.getById('1111222233330000ffffcccc');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
      } 
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});