import { Component, Output, EventEmitter, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Subject } from 'rxjs';

import { debounceTime }  from 'rxjs/operators';

@Component({

  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string = '';

  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Output() onSugerenciasOff: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('inputBuscar') inputBuscar!: ElementRef<HTMLInputElement>;

  public termino: string = '';

  private debouncer: Subject<string> = new Subject();

  ngOnInit (): void {

    this.debouncer
      .pipe( debounceTime(90) )
      .subscribe( valor => {

        this.onDebounce.emit(valor);
      });
  };

  buscar(): void {

    this.onEnter.emit(this.termino);

    this.termino = '';

    this.inputBuscar.nativeElement.blur();
  };

  teclaPresionada () {

    this.debouncer.next(this.termino);
  };

  sugerenciasOff() {

    this.onSugerenciasOff.emit();

    this.termino = '';
  };
};
