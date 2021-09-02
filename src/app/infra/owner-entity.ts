import { CarEntity } from './car-entity';

export interface OwnerEntity {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  cars?: CarEntity[];
}
