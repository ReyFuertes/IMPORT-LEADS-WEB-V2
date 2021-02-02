import { PillStateType, IContractProduct } from './../../../modules/contracts/contract.model';
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

  @Input() public selectable: boolean = false;
  @Input() public enableHighlight: boolean = false;
  @Input() public enabled: boolean = true;
  @Input() public state: PillStateType;
  @Input() public size: string = 'medium';
  @Input() public reset: boolean = false;
  @Input() public hasRemoveIcon: boolean = true;
  @Input() public isSelected: boolean = false;
  @Output() public removeEmitter = new EventEmitter<number>();
  @Output() public stateEmitter = new EventEmitter<PillStateType>();
  @Output() public deSelectEmitter = new EventEmitter<ISimpleItem>();
  @Output() public preSelectEmitter = new EventEmitter<ISimpleItem>();

  @ViewChild('pill', { static: false }) pill: any;
  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    fromEvent(this.pill.nativeElement, 'dblclick')
      .subscribe((e: any) => {
        this.resetSelection();
        
        this.deSelectEmitter.emit({
          label: e.target.innerText.trim(),
          value: e.currentTarget.id,
          _id: e.currentTarget.attributes._id.value
        });
      });

    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //this.resetSelection();
  }

  private resetSelection(): void {
    let selectors = document.querySelectorAll('il-pill') as any;
    selectors.forEach(element => {
      element.children[0].classList.remove('sel');
    });
  }

  public onSelect(e: any, item: ISimpleItem): void {
    this.resetSelection();

    e.currentTarget.classList.add('selected');
  
    this.preSelectEmitter.emit(item);
  }

  public get isSizeSmall(): boolean {
    return this.size === 'small';
  }
}
