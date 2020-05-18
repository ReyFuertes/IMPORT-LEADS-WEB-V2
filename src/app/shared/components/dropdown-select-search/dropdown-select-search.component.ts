import { environment } from './../../../../environments/environment';
import { takeUntil } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';
import { ISimpleItem } from '../../generics/generic.model';
import { GenericControl } from '../../generics/generic-control';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControlName, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'il-dropdown-select-search',
  templateUrl: './dropdown-select-search.component.html',
  styleUrls: ['./dropdown-select-search.component.scss']
})

export class DropdownSelectSearchComponent extends GenericControl<ISimpleItem> implements OnInit, AfterViewInit, OnChanges {
  @Input()
  public items: ISimpleItem[];
  @Input()
  public placeholder: string = '';
  @Input()
  public controlName: any;
  @Input()
  public form: FormGroup;
  @Input()
  public selectedItem: any;
  @Output()
  public valueEmitter = new EventEmitter<any>();

  public dataFilterForm = new FormControl();
  public $filteredData = new ReplaySubject<any>();
  public svgPath: string = environment.svgPath;
  private newList: ISimpleItem[];
  private $destroy = new Subject<void>();

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    if (this.items && this.items.length > 0) {
      this.newList = this.items.slice();

      this.$filteredData.next(this.newList);
    }

    this.dataFilterForm.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => this.filterdata());
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  private filterdata(): void {
    let search: string = this.dataFilterForm.value;

    if (!search) {
      this.$filteredData.next(this.newList);
      return;
    } else {
      search = search.toLowerCase();
    }

    this.$filteredData.next(
      this.newList.filter(data => data.label.toLowerCase().indexOf(search) > -1)
    );
  }
}
