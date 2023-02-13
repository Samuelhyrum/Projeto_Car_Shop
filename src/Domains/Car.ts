import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor({
    id,
    model,
    year,
    color,
    status,
    buyValue,
    doorsQty,
    seatsQty,
  }: ICar) {
    super({ id, model, year, color, status, buyValue });
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }

  public getDoorsQty(): number {
    return this.doorsQty;
  }
  public seDoorsQty(value: number) {
    this.doorsQty = value;
  }

  public getSeatsQty(): number {
    return this.seatsQty;
  }
  public setSeatsQty(value: number) {
    this.seatsQty = value;
  }
}    
export default Car;