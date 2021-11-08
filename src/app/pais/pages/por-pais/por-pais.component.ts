import { Component } from '@angular/core';

import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    
    `
      a {

        cursor: pointer;
        max-width: 280px;
        border-color: #ced4da;
        margin-left: 10px;
        max-height: 36px;
        line-height: 18px;
        overflow: hidden;
        white-space: nowrap;
      }
    `
  ],
})
export class PorPaisComponent {

  public termino: string = '';

  public error: boolean = false;

  public sugerencias: boolean = true;

  public mostrarSugerencias: boolean = false;

  public paises: Country[] = [];

  public paisesSugeridos: Country[] = [];

  constructor (private paisService: PaisService) {

    this.paises = JSON.parse ( localStorage.getItem('porNombre')! ) || [];
  };

  buscar(termino: string): void {

    this.error = false;

    this.sugerencias = false;

    this.mostrarSugerencias = false;
    
    this.termino = termino.trim();

    if (this.termino.length > 0) {

      this.paisService.buscarPais(this.termino)
      .subscribe( (paises) => {
      
          this.paises = paises;

          this.sugerencias = true;

          localStorage.setItem( 'porNombre', JSON.stringify(this.paises) );
        },
      
        (error) => {
          
        console.error(error);

        this.error = true;

        this.sugerencias = true;

        this.paises = [];
      });

    } else {return};
  };

  sugerenciasBusqueda (termino: string):void {

    this.error = false;

    (this.sugerencias) ? this.mostrarSugerencias = true : this.mostrarSugerencias = false;

    this.termino = termino.trim();

    if (this.termino.length > 0) { 

      this.paisService.buscarPais(this.termino)

        .subscribe ( 
          
        paises => this.paisesSugeridos = paises.slice(0,5),

        (error) => this.paisesSugeridos = [],
      );
    };

    (termino.trim().length === 0) ? this.mostrarSugerencias = false : '';
  };

  buscarSugeridos (termino: string): void {

    if (this.termino.length > 0) {

      this.buscar(termino);
    };
  };

  sugerenciasOff () {

    setTimeout( () => {

      this.mostrarSugerencias = false;
      
    }, 200);
  };
};
