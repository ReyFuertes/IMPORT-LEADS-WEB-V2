import { PillState } from './../../../modules/contracts/contract.model';
import { ISimpleItem } from './../../generics/generic.model';
import { GenericControl } from './../../generics/generic-control';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ɵConsole, OnChanges, SimpleChanges } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'il-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})

export class PillComponent extends GenericControl<ISimpleItem> implements OnInit, AfterViewInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public selected: boolean = false;

  @Input()
  public selectable: boolean = false;
  @Input()
  public enableHighlight: boolean = false;
  @Input()
  public enabled: boolean = true;
  @Input()
  public state: PillState;
  @Input()
  public size: string = 'medium';
  @Input()
  public reset: boolean = false;
  @Input()
  public hasRemoveIcon: boolean = true;
  @Output()
  public removeEmitter = new EventEmitter<number>();
  @Output()
  public stateEmitter = new EventEmitter<PillState>();
  @Output()
  public deSelectEmitter = new EventEmitter<boolean>(null);

  @ViewChild('pill', { static: false }) pill: any;
  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    fromEvent(this.pill.nativeElement, 'dblclick')
      .subscribe((e: any) => {
        this.resetSelection();
        this.deSelectEmitter.emit(false);
      });

    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    /* reset selection */
    if (changes && changes.reset && changes.reset.currentValue) {
      this.reset = false;
    }
  }

  private resetSelection(): void {
    let selectors = document.querySelectorAll('il-pill') as any;
    selectors.forEach(element => {
      element.children[0].classList.remove('selected');
    });
  }

  public onSelect(event: any): void {
    this.resetSelection();

    event.currentTarget.classList.add('selected');
  }

  public get isSizeSmall(): boolean {
    return this.size === 'small';
  }
}
