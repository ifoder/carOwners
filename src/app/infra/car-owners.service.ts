import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarEntity } from './car-entity';
import { ICarOwnersService } from './car-owners';
import { OwnerEntity } from './owner-entity';

@Injectable({
  providedIn: 'root',
})
export class CarOwnersService implements ICarOwnersService {
  private ownersUrl = 'api/owners'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.ownersUrl).pipe(
      tap((_) => console.log('fetched owners')),
      catchError(this.handleError<OwnerEntity[]>('getOwners', []))
    );
  }

  getOwnerById(aId: number): Observable<OwnerEntity> {
    const url = `${this.ownersUrl}/${aId}`;

    return this.http.get<OwnerEntity>(url).pipe(
      tap((_) => console.log(`fetched owner id=${aId}`)),
      catchError(this.handleError<OwnerEntity>(`getOwner id=${aId}`))
    );
  }

  createOwner(
    aId: number,
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity> {
    let owner: OwnerEntity = {
      id: aId,
      lastName: aLastName,
      firstName: aFirstName,
      middleName: aMiddleName,
      cars: aCars,
    };

    return this.http
      .post<OwnerEntity>(this.ownersUrl, owner, this.httpOptions)
      .pipe(
        tap((newOwner: OwnerEntity) =>
          console.log(`added hero w/ id=${owner.id}`)
        ),
        catchError(this.handleError<OwnerEntity>('addOwner'))
      );
  }
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    console.log(aOwner);

    return this.http
      .put<OwnerEntity>(this.ownersUrl, aOwner, this.httpOptions)
      .pipe(
        tap((_) => console.log(`update owner id=${aOwner.id}`)),
        catchError(this.handleError<OwnerEntity>('updateOwner'))
      );
  }

  deleteOwner(aOwnerId: number): Observable<OwnerEntity> {
    const url = `${this.ownersUrl}/${aOwnerId}`;

    return this.http.delete<OwnerEntity>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted owner id=${aOwnerId}`)),
      catchError(this.handleError<OwnerEntity>('deleteOwner'))
    );
  }

  genId(owners: OwnerEntity[]): number {
    return owners.length > 0
      ? Math.max(...owners.map((owner) => owner.id)) + 1
      : 11;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
