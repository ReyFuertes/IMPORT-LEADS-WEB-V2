import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, OnChanges, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'il-dropdown-multi-select',
  templateUrl: './dropdown-multi-select.component.html',
  styleUrls: ['./dropdown-multi-select.component.scss']
})
export class DropdownMultiSelectComponent implements OnInit, OnDestroy {
  @Input()
  public form: FormGroup;
  @Input()
  public placeHolder: string = '';
  @Input()
  public searchItem: boolean = false;
  @Input()
  public dataList: any[] = [];
  @Input()
  public controlName: any;
  @Output()
  public valueEmitter = new EventEmitter<any>();
  public dataFilterForm = new FormControl();
  public filteredData$ = new ReplaySubject<any>();

  private newDataList: any;
  private _unsubscribe$ = new Subject<void>();

  constructor() { }

  ngOnInit() {
    //when edit mode pass id to display selected item
    const id: string = this.form.get(this.controlName).value &&
      this.form.get(this.controlName).value.id || null;
    if (id) this.form.get(this.controlName).patchValue(id);

    //filter etc..
    this.newDataList = this.dataList.slice();
    this.filteredData$.next(this.newDataList);
    this.dataFilterForm.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this.filterdata();
      });
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
  private filterdata(): void {
    let search: string = this.dataFilterForm.value;

    if (!search) {
      this.filteredData$.next(this.newDataList);
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredData$.next(
      this.newDataList.filter(data => data.label.toLowerCase().indexOf(search) > -1)
    );
  }
}
