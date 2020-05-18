import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberOnlyDirective {
  private specialKeys = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', ',' , '.' ];
  constructor() {}

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    const enteredKey = event.key;
    if (this.specialKeys.indexOf(enteredKey) !== -1 || isNaN(Number(enteredKey)) === false) {
      return;
    }
    event.preventDefault();
  }
}
