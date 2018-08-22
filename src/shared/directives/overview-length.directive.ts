import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[length-directive]'
})

export class OverviewLengthDirective {

  constructor(el: ElementRef) {
    console.log(el)
    }
}

