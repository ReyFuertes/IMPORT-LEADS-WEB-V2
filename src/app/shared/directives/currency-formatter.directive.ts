
import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { customCurrencyPipe } from '../pipes/custom-currency.pipe';

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[currencyFormatter]' })
export class CurrencyFormatterDirective implements OnInit {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: customCurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.el.value !== '') {
      const val: number = Number(this.el.value);
      this.el.value = this.currencyPipe.transform(val);
    }
  }

}
