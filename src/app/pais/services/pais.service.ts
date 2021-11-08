import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlApi: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {};

  buscarPais(termino: string): Observable<Country[]> {

    const url: string = `${this.urlApi}/name/${termino}`;

    return this.http.get<Country[]>(url);
  };

  buscarPaisPorCapital (termino: string): Observable<Country[]> {

    const url: string = `${this.urlApi}/capital/${termino}`;

    return this.http.get<Country[]>(url);
  };

  buscarPaisPorCodigo (id: string): Observable<Country[]> {

    const url: string = `${this.urlApi}/alpha/${id}`;

    return this.http.get<Country[]>(url);
  };

  buscarPaisPorRegion (region: string): Observable<Country[]> {

    const url: string = `${this.urlApi}/region/${region}`;

    return this.http.get<Country[]>(url);
  };
};
