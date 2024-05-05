import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlApi: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {};

  buscarPais(termino: string): Observable<Country[]> {
    const url: string = `${this.urlApi}/name/${termino}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map( paises => {
        return paises.sort((a,b) => (a.translations.spa.common > b.translations.spa.common) ? 1 : -1 );
      }),
    );
  };

  buscarPaisPorCapital (termino: string): Observable<Country[]> {
    const url: string = `${this.urlApi}/capital/${termino}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map( paises => {
        return paises.sort((a,b) => (a.translations.spa.common > b.translations.spa.common) ? 1 : -1 );
      }),
    );
  };

  buscarPaisPorCodigo (id: string): Observable<Country[]> {
    const url: string = `${this.urlApi}/alpha/${id}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map( paises => {
        return paises.sort((a,b) => (a.translations.spa.common > b.translations.spa.common) ? 1 : -1 );
      }),
    );
  };

  buscarPaisPorRegion (region: string): Observable<Country[]> {
    const url: string = `${this.urlApi}/region/${region}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map( paises => {
        return paises.sort((a,b) => (a.translations.spa.common > b.translations.spa.common) ? 1 : -1 );
      }),
    );
  };
};
