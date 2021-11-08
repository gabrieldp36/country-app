import { Component } from '@angular/core';

import { Country, Region } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [

    `
      button {

        border-radius: 10px;
        margin-left: 20px;
      }

      .btn:focus {
        outline: none;
        box-shadow: none;
      }
    `
  ]
})
export class PorRegionComponent {

  public regiones: Region[] = [

    {
      nombre: 'África',
      termino: 'africa',
    },

    {
      nombre: 'Ámerica',
      termino: 'americas',
    },

    {
      nombre: 'Asia',
      termino: 'asia',
    },

    {
      nombre: 'Europa',
      termino: 'europe',
    },

    {
      nombre: 'Oceanía',
      termino: 'oceania',
    },
  ];

  public regionActiva: string = '';

  public error: boolean = false;

  public paises: Country[] = [];

  constructor (private paisService: PaisService) {

    this.paises = JSON.parse ( localStorage.getItem('porRegion')! ) || [];

    this.regionActiva = localStorage.getItem('regionActiva')! || '';
  };

  fijarClaseCCS (region:string): string {

    return (this.regionActiva === region) ? 'btn btn-success' : 'btn btn-outline-success';
  };

  buscarPorRegion (region: string, termino: string) {

    if (this.regionActiva === region) {return};

    this.error = false;

    this.regionActiva = region;

    localStorage.setItem('regionActiva', this.regionActiva);

    this.paisService.buscarPaisPorRegion(termino)
      .subscribe ( (paises) => {
        
        this.paises = paises;

        localStorage.setItem( 'porRegion', JSON.stringify(this.paises) );
      },
      
        (error) => {
          
        console.error(error);

        this.error = true;

        this.paises = [];
      }
    );
  };
};
