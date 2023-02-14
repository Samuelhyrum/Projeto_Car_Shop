import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoCategory from '../Interfaces/type/CategoriesMoto';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: MotoCategory;
  private engineCapacity: number;

  constructor({
    id,
    model,
    year,
    color,
    status,
    buyValue,
    category,
    engineCapacity,
  }: IMotorcycle) {
    super({ id, model, year, color, status, buyValue });
    this.category = category;
    this.engineCapacity = engineCapacity;
  }

  public getCategory(): string {
    return this.category;
  }
  public seCategory(value: MotoCategory) {
    this.category = value;
  }

  public getEngineCapacity(): number {
    return this.engineCapacity;
  }
  public setengineCapacity(value: number) {
    this.engineCapacity = value;
  }
}    
export default Motorcycle;