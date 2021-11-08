import { Component, Input } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';

@Component({

  selector: 'app-pais-table',
  templateUrl: './pais-table.component.html',
  styles: [

    `
      img {

        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
      }
    `
  ]
})
export class PaisTableComponent {

  @Input() paises: Country[] = [];
};
