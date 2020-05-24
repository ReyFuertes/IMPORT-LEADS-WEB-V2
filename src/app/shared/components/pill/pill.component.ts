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

  @ViewChild('btn', { static: false }) ev: any;
  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // fromEvent(this.ev.nativeElement, 'dblclick')
    //   .subscribe((e: any) => {
    //     this.selected = !this.selected;
    //     this.deSelectEmitter.emit(false);
    //   });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selected && changes.selected.currentValue) {
      this.selected = changes.selected.currentValue;
    }
    /* reset selection */
    if (changes && changes.reset && changes.reset.currentValue) {
      this.selected = false;
    }
  }

  public onHighlightProduct(event: any): void {
    event.preventDefault();

    this.stateEmitter.emit();
    this.cdRef.detectChanges();

    this.selected = !this.selected;
  }

  public get isSizeSmall(): boolean {
    return this.size === 'small';
  }
}
