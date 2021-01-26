import { environment } from './../../../../environments/environment';
import { takeUntil } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';
import { ISimpleItem } from '../../generics/generic.model';
import { GenericControl } from '../../generics/generic-control';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'il-dropdown-select-search',
  templateUrl: './dropdown-select-search.component.html',
  styleUrls: ['./dropdown-select-search.component.scss']
})

export class DropdownSelectSearchComponent extends GenericControl<ISimpleItem> implements OnInit, AfterViewInit, OnChanges {
  public dataFilterForm = new FormControl();
  public $filteredData = new ReplaySubject<any>();
  private newList: ISimpleItem[];

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    if (this.options && this.options.length > 0) {
      this.newList = this.options.slice();
      this.$filteredData.next(this.newList);
    }

    this.dataFilterForm.valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => this.filterdata());
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedItem = changes?.selectedItem.currentValue;
    
    console.log(this.selectedItem)
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
