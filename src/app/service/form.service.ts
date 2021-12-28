import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of (data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    let startYear: number = new Date().getFullYear();
    let endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of (data);
  }

  getCountries(): Observable<Country[]> {
    const url = "http://localhost:8080/api/countries"
    return this.http.get<GetResponseCountries>(url).pipe(
      map(response => response._embedded.countries));
  } 

  getCountryStates(code: string): Observable<State[]> {
    const url = `http://localhost:8080/api/states/search/findByCountryCode?code=${code}`;
    return this.http.get<GetResponseStates>(url).pipe(
      map(response => response._embedded.states));
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
