import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';

import { Country, Moneda, Traducciones } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
    `
      li {

        background-color:#deb887;
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
      }
    `
  ]
})
export class VerPaisComponent implements OnInit {

  public pais!:Country;

  public moneda: string = '';

  public lenguaje: string = '';

  public nombresTraducidos: string[] = [];

  constructor(

    private activatedRoute: ActivatedRoute,

    private paisService: PaisService,
  
  ) {};

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe( switchMap ( ( {id} ) => this.paisService.buscarPaisPorCodigo(id) ) )
      .subscribe( (pais) => {
      
      this.pais = pais.shift()!;

      // Obtenemos la información de la moneda.

      if (this.pais.currencies) {
      
        const monedaArr: Moneda[] = Object.values(this.pais.currencies);

        monedaArr.forEach( (moneda, index) => {

          if (monedaArr.length === 1) {

            this.moneda += `${moneda.name}.`;

          } else if (index < monedaArr.length -1 ) {

            this.moneda += `${moneda.name}, `;

          } else if (index === monedaArr.length -1) {

            this.moneda += `${moneda.name}.`;
          };
        
        });
      };

      // Extraemos la información del idioma.

      if (this.pais.languages) {

        const lenguajesArr: string[] = Object.values(this.pais.languages);

        lenguajesArr.forEach( (idioma, index) => {

          if (lenguajesArr.length === 1) {

            this.lenguaje += `${idioma}.`;

          } else if (index < lenguajesArr.length -1 ) {

            this.lenguaje += `${idioma}, `;

          } else if (index === lenguajesArr.length -1) {

            this.lenguaje += `${idioma}.`;
          };
        });
      };

      // Extraemos la traducción del nombre del país.

      if (this.pais.translations) {

        const traduccionesArr: Traducciones[] = Object.values(this.pais.translations).splice(0,12);

        traduccionesArr.forEach ( traduccion => {
          
          this.nombresTraducidos.push(traduccion.common);
        });
      };
    });
  };
};
