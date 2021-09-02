import { MessageService } from './../infra/message.service';
import { CarOwnersService } from './../infra/car-owners.service';
import { CRUD } from 'src/app/infra/crud';
import { OwnerEntity } from '../infra/owner-entity';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Injector } from '@angular/core';

export class BaseComponent {
  protected carOwnerService: CarOwnersService;
  protected fb: FormBuilder;
  protected route: ActivatedRoute;
  protected router: Router;
  protected location: Location;
  protected msg: MessageService;
  crud = CRUD.create;
  loadPage = false;

  owner: OwnerEntity = {} as OwnerEntity;
  owners: OwnerEntity[] = [];

  constructor(injector: Injector) {
    this.carOwnerService = injector.get(CarOwnersService);
    this.fb = injector.get(FormBuilder);
    this.route = injector.get(ActivatedRoute);
    this.location = injector.get(Location);
    this.router = injector.get(Router);
    this.msg = injector.get(MessageService);
  }

  getOwners(): void {
    this.carOwnerService.getOwners().subscribe((data) => {
      this.owners = data;
      this.hideloader();
    });
  }

  generateOwnerId(): void {
    this.carOwnerService
      .getOwners()
      .toPromise()
      .then((data) => {
        this.owner.id = this.carOwnerService.genId(data);
        this.hideloader();
      });
  }

  hideloader() {
    // Setting display of spinner
    // element to none
    document.getElementById('loading')!.style.display = 'none';
  }
}
