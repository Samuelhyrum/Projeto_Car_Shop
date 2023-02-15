import MotoODM from '../Models/MotoOdm';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import HttpException from '../Middlewares/HttpException';

class MotoService {
  private createMotoDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(
        moto,
      );
    }
    return null;
  }

  public async CreateMoto(moto: IMotorcycle) {
    const motoODM = new MotoODM();
    const newMoto = await motoODM.create(moto);
    return this.createMotoDomain(newMoto);
  }

  public async getAllMotos() {
    const motoODM = new MotoODM();
    const motos = await motoODM.findAllCar();
    const motoArray = motos.map((moto) =>
      this.createMotoDomain(moto));
    return motoArray;
  }

  public async getById(id: string) {
    const motoODM = new MotoODM();
    const moto = await motoODM.findById(id);
    if (!moto) {
      throw new HttpException(404, 'Motorcycle not found');
    }
    const motoArray = this.createMotoDomain(moto);
    return motoArray;
  }

  public async updateById(id: string, motoUpt: IMotorcycle) {
    const motoODM = new MotoODM();
    const moto = await motoODM.findById(id);
    if (!moto) {
      throw new HttpException(404, 'Motorcycle not found');
    }
    const newIdOfMoto = await motoODM.update(id, motoUpt);

    return this.createMotoDomain(newIdOfMoto);
  }
}

export default MotoService;