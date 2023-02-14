import MotoCategory from './type/CategoriesMoto';

interface IMotorcycle {
  id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean | false;
  buyValue: number;
  category: MotoCategory;
  engineCapacity: number;
}
    
export default IMotorcycle;