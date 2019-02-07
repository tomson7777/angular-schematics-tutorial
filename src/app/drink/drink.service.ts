import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const ENDPOINTS = {
  GET_DRINK: '',
};

@Injectable({providedIn: 'root'})
export class DrinkService {

  constructor(private http: HttpClient) {}
  
  getDrink(): Observable<Drink[]> {
    return this.http.get<Drink[]>(ENDPOINTS.GET_DRINK, { responseType: 'text' } );
  }
}
