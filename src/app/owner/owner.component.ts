import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { OwnerEntity } from '../infra/owner-entity';
import { CRUD } from '../infra/crud';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  dataSource = new MatTableDataSource<OwnerEntity>();
  clickedRow = new Set<OwnerEntity>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.getOwners();
  }

  getOwners(): void {
    this.carOwnerService.getOwners().subscribe((owners: OwnerEntity[]) => {
      this.dataSource.data = owners;
      this.hideloader();
    });
  }

  addButtonClicked() {
    this.router.navigate([`/owner/${CRUD.create}`]);
  }

  editButtonClicked() {
    this.getSelectedRow();
    this.router.navigate([`/owner/${CRUD.edit}/${this.owner.id}`]);
  }

  reviewButtonClicked() {
    this.getSelectedRow();
    this.router.navigate([`/owner/${CRUD.review}/${this.owner.id}`]);
  }

  deleteButtonClicked() {
    this.getSelectedRow();
    this.carOwnerService.deleteOwner(this.owner.id).subscribe(() => {
      this.getOwners();
      this.msg.add(`Владелец ${this.owner.firstName} успешно удалён!`);
    });
  }

  getSelectedRow() {
    if (this.clickedRow.size == 1)
      this.clickedRow.forEach((row) => (this.owner = row));
  }
}
