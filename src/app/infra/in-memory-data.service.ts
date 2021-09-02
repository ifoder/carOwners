import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { OwnerEntity } from './owner-entity';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const owners: OwnerEntity[] = [
      {
        id: 1,
        lastName: 'Иванов',
        firstName: 'Иван',
        middleName: 'Иванович',
        cars: [
          {
            numberplate: 'XX9999XX',
            brand: 'Tesla',
            model: 'Model S',
            year: 2021,
          },
        ],
      },
      {
        id: 2,
        lastName: 'Петрова',
        firstName: 'Наталья',
        middleName: 'Игоревна',
        cars: [
          {
            numberplate: 'AX2121HP',
            brand: 'Hyundai',
            model: 'Accent',
            year: 2009,
          },
          {
            numberplate: 'BC7286AE',
            brand: 'KIA',
            model: 'Optima',
            year: 2019,
          },
          {
            numberplate: 'AK4545AM',
            brand: 'Ferrari',
            model: 'LaFerrari',
            year: 2020,
          },
        ],
      },
      {
        id: 3,
        lastName: 'Антонов',
        firstName: 'Алексей',
        middleName: 'Сергеевич',
        cars: [
          {
            numberplate: 'AI1234AA',
            brand: 'Mercedes-Benz',
            model: 'W210',
            year: 1995,
          },
        ],
      },
    ];
    return { owners };
  }
}
