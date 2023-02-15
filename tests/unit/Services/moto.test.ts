import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotoService from '../../../src/Services/MotoService';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Deveria criar uma nova moto', function () {
  it('Deveria criar uma moto com sucesso ', async function () {
    // Arrange
    const motoInput: IMotorcycle = {
      model: 'Honda Cb 600f Horne',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motoOutput: Motorcycle = new Motorcycle(
      {
        id: '6348513f34c397abcad040b2',
        model: 'Honda Cb 600f Horne',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    );
    sinon.stub(Model, 'create').resolves(motoOutput);

    const service = new MotoService();
    const result = await service.CreateMoto(motoInput);

    expect(result).to.be.deep.equal(motoOutput);
    sinon.restore();
  });
  describe('Testando o metodo Get ', function () {
    const inputArray = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hort',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000r',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];
    it('Deveria trazer um array de motos', async function () {
    // Arrange
      const motoOutput: Motorcycle[] = inputArray.map((moto) => new Motorcycle(moto));
      sinon.stub(Model, 'find').resolves(motoOutput);
    
      const service = new MotoService();
      const result = await service.getAllMotos();
    
      expect(result).to.be.deep.equal(motoOutput);
      sinon.restore();
    });

    it('Deveria trazer uma moto', async function () {
      // Arrange
      const motoOutput : Motorcycle = new Motorcycle(
        {
          id: '634852326b35b59438fbea31',
          model: 'Honda Cbr 1000rr',
          year: 2011,
          color: 'Orange',
          status: true,
          buyValue: 59.900,
          category: 'Street',
          engineCapacity: 1000,
        },
      );
      sinon.stub(Model, 'findOne').resolves(motoOutput);
        
      const service = new MotoService();
      const result = await service.getById('634852326b35b59438fbea31');
        
      expect(result).to.be.deep.equal(motoOutput);
      sinon.restore();
    });
    it('Erro ao passar id invalido ', async function () {
      // Arrange
      const motoOutput : Motorcycle = new Motorcycle(
        {
          id: '634852326b35b59438fbea31',
          model: 'Honda Cbr 1000rr',
          year: 2011,
          color: 'Orange',
          status: true,
          buyValue: 59.900,
          category: 'Street',
          engineCapacity: 1000,
        },
      );
      sinon.stub(Model, 'findOne').resolves(motoOutput);
               
      try {
        const service = new MotoService();
        await service.getById('WRONG ID');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      } sinon.restore();
    });
    it('Erro ao passar id inexistente ', async function () {
      // Arrange
      
      sinon.stub(Model, 'findOne').resolves(false);
                 
      try {
        const service = new MotoService();
        await service.getById('1111222233330000ffffcccc');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      } 
    });
    afterEach(function () {
      sinon.restore();
    });
  });
  describe('Testando o metodo Put ', function () {
    it('Atualizando o id da moto ', async function () {
      const motoInput: IMotorcycle = {
        model: 'Honda Cb 600f Hornt',
        year: 2014,
        color: 'Red',
        status: true,
        buyValue: 45.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const motoOutput: Motorcycle = new Motorcycle(
        {
          id: '634852326b35b59438fbea2f',
          model: 'Honda Cb 600f Hornt',
          year: 2014,
          color: 'Red',
          status: true,
          buyValue: 45.000,
          category: 'Street',
          engineCapacity: 600,
        },
      );
      sinon.stub(Model, 'findOne').resolves(true);
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motoOutput);

      const service = new MotoService();
      const result = await service.updateById('634852326b35b59438fbea2f', motoInput);

      expect(result).to.be.deep.equal(motoOutput);
      sinon.restore();
    });
    it('Erro ao passar id invalido ', async function () {
      // Arrange
      const motoInput: IMotorcycle = {
        model: 'Honda Cb 600f Honet',
        year: 2014,
        color: 'Red',
        status: true,
        buyValue: 45.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const motoOutput : Motorcycle = new Motorcycle(
        {
          id: '634852326b35b59438fbea2f',
          model: 'Honda Cb 600f Honet',
          year: 2014,
          color: 'Red',
          status: true,
          buyValue: 45.000,
          category: 'Street',
          engineCapacity: 600,
        },
      );
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motoOutput);
               
      try {
        const service = new MotoService();
        await service.updateById('WRONG ID', motoInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      } sinon.restore();
    });

    it('Erro ao passar id de um carro inexistente ', async function () {
      // Arrange
      const motoInput: IMotorcycle = {
        model: 'Honda Cb 600f Hornet',
        year: 2014,
        color: 'Red',
        status: true,
        buyValue: 45.000,
        category: 'Street',
        engineCapacity: 600,
      };
      sinon.stub(Model, 'findOne').resolves(true);
      sinon.stub(Model, 'findByIdAndUpdate').resolves(false);
                 
      try {
        const service = new MotoService();
        await service.updateById('1111222233330000ffffcccc', motoInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      } sinon.restore();
    });
  });
});