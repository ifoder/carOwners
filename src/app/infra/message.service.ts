import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right'; // start, center, end, left, right
  verticalPosition: MatSnackBarVerticalPosition = 'top'; // top

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  add(msg: string) {
    console.log(msg);
    this.openSnackBar(msg);
  }
}
