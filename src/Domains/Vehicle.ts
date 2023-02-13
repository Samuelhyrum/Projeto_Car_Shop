import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  private id: string | undefined;
  private model: string;
  private year: number;
  private color: string;
  private status ?: boolean;
  private buyValue: number;
  
  constructor(
    { id,
      model,
      year,
      color,
      buyValue,
      status = false, 
    }: IVehicle,
  ) {
    this.id = id;
    this.model = model;
    this.color = color;
    this.year = year;
    this.status = status;
    this.buyValue = buyValue;
  }
  
  public setId(id: string) {
    this.id = id;
  }
  
  public getId() {
    return this.id;
  }
  
  public setModel(model: string) {
    this.model = model;
  }
  
  public getModel() {
    return this.model;
  }
  
  public setColor(color: string) {
    this.color = color;
  }
  
  public getColor() {
    return this.color;
  }
  public setYear(year: number) {
    this.year = year;
  }
  
  public getYear() {
    return this.year;
  }

  public getStatus() {
    return this.status;
  }
  public setStatus(value: boolean) {
    this.status = value;
  }
  
  public setBuyValue(buyValue: number) {
    this.buyValue = buyValue;
  }
  
  public getBuyValue() {
    return this.buyValue;
  }
}
  
export default Vehicle;