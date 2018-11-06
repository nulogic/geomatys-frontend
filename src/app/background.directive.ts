import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})


export class BackgroundDirective {

  @Input() bgPath: string;

  constructor(el: ElementRef) {

  }  
}
