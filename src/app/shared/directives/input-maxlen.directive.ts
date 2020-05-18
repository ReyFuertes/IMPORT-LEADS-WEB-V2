import {
  AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2, Optional, OnDestroy
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[InputMaxLength]'
})
export class InputMaxLengthDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() InputMaxLength: number;
  private div: HTMLDivElement;
  private destroyed$ = new Subject();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() private ngModel: NgModel,
  ) { }

  @HostListener('input', ['$event']) onChange(event) {}

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'maxLength', this.InputMaxLength.toString());
    if (this.ngModel) {
      this.ngModel.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe()
    }
  }

  ngAfterViewInit() {
    this.div = this.renderer.createElement('span');
    this.div.classList.add('count');
    this.renderer.insertBefore(this.el.nativeElement.parentNode, this.div, this.el.nativeElement.nextSibling);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    if (this.div) {
      this.div.remove();
    }
  }
}
