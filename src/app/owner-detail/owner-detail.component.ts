import { CarEntity } from './../infra/car-entity';
import { OwnerEntity } from './../infra/owner-entity';
import { Component, OnInit, Injector } from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss'],
})
export class OwnerDetailComponent extends BaseComponent implements OnInit {
  ownerForm!: FormGroup;
  id?: number;
  today = new Date();
  year = this.today.getFullYear();
  review: boolean = false;

  emtyCarForm: CarEntity = {
    numberplate: '',
    brand: '',
    model: '',
    year: 0,
  };
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('crud')) {
      this.crud = this.route.snapshot.paramMap.get('crud')!;
    }
    if (this.crud == 'review') {
      this.review = true;
    }
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      this.getOwner();
    } else {
      this.createOwner();
    }
  }

  get cars() {
    return this.ownerForm.get('cars') as FormArray;
  }

  get lastName() {
    return this.ownerForm.get('lastName')!;
  }

  get firstName() {
    return this.ownerForm.get('firstName')!;
  }

  get middleName() {
    return this.ownerForm.get('middleName')!;
  }

  getOwner(): void {
    this.carOwnerService
      .getOwnerById(this.id!)
      .toPromise()
      .then((data) => {
        this.owner = data;
      })
      .then(() => this.hideloader())
      .catch((err) => console.log(err))
      .finally(() => this.setForm());
  }

  createOwner(): void {
    this.generateOwnerId();

    this.setForm();
  }

  setForm() {
    this.ownerForm = this.fb.group({
      lastName: new FormControl(
        { value: this.owner.lastName ?? '', disabled: this.review },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(`^[а-яА-Яa-zA-Z]{3,40}`),
        ]
      ),
      firstName: new FormControl(
        { value: this.owner.firstName ?? '', disabled: this.review },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(`^[а-яА-Яa-zA-Z]{3,40}`),
        ]
      ),
      middleName: new FormControl(
        { value: this.owner.middleName ?? '', disabled: this.review },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(`^[а-яА-Яa-zA-Z]{3,40}`),
        ]
      ),
      cars: this.fb.array([]),
    });

    if (this.owner.cars) {
      this.owner.cars?.forEach((car) => this.addCar(car));
    } else {
      this.addCar();
    }
  }

  deleteCar(i: number): void {
    this.cars.removeAt(i);
    this.msg.add(`Автомобиль удалён!`);
  }

  addCar(car?: CarEntity): void {
    if (!car) car = this.emtyCarForm;
    const carsForm = new FormGroup({
      numberplate: new FormControl(
        { value: car.numberplate, disabled: this.review },
        [
          Validators.required,
          Validators.pattern(`^[А-ЯA-Z]{2}[0-9]{4}[А-ЯA-Z]{2}`),
        ]
      ),
      brand: new FormControl({ value: car.brand, disabled: this.review }, [
        Validators.required,
        Validators.minLength(3),
      ]),
      model: new FormControl(
        {
          value: car.model,
          disabled: this.review,
        },
        [Validators.required, Validators.minLength(3)]
      ),
      year: new FormControl(
        { value: car.year !== 0 ? car.year : '', disabled: this.review },
        [
          Validators.required,
          Validators.pattern(`^[1-2]{1}[0,2,9]{1}[0,1,2,7,8,9]{1}[0-9]{1}`),
        ]
      ),
    });

    this.cars.push(carsForm);
  }

  onSubmit(): void {
    let newOwner: OwnerEntity = this.ownerForm.value;
    newOwner.id = this.owner.id;
    this.carOwnerService
      .createOwner(
        newOwner.id,
        newOwner.lastName,
        newOwner.firstName,
        newOwner.middleName,
        newOwner.cars as CarEntity[]
      )
      .subscribe(() => {
        this.msg.add(`Данные по владельцу успешно сохранены!`);
        this.backButtonClicked();
      });
  }

  backButtonClicked(): void {
    this.router.navigate(['/owners']);
  }

  getValidationError(input: any, i: number) {
    if (input.errors?.required) return 'Поле не должно быть пустым!';
    else if (input.errors?.minlength && i == 1)
      return 'Поле должно содержать больше 2 символов!';
    else if (input.errors?.pattern && i == 1) return 'Символы запрещены!';
    else if (input.errors?.pattern && i == 2) return 'Формат номера [XX1234XX]';
    else if (input.errors?.pattern && i == 3) return '1970-2021';
    else return;
  }
}
