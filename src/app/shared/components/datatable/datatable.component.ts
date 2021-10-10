import { ISimpleItem } from './../../generics/generic.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { environment } from './../../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { splitToSentCase } from '../../util/format-value';

@Component({
  selector: 'iv-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})

export class DatatableComponent extends GenericRowComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() public cols: string[] = [];
  @Input() public data: any[];
  @Input() public colControlIndex: number = 1;
  @Input() public colFunc: () => void;
  @Input() public items: ISimpleItem[];
  @Input() public pageSizeOptions: number[] = [10, 15, 25, 100];
  @Input() public ddPlaceholder: string = 'Select item';
  @Input() public defaultPageSize: number = 25;
  @Output() public deleteEmitter = new EventEmitter<any>();
  @Output() public ddUpdateEmitter = new EventEmitter<{ parent: any, child: any }>();

  public svgPath: string = environment.svgPath;
  public dataSource: MatTableDataSource<any[]>;
  public splitToSentCase = splitToSentCase;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public form: FormGroup;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    super();
    this.form = this.fb.group({
      parent: [null]
    });
  }

  public formatItems(data: any): any {
    return data?.map(d => {
      return {
        cost: d.cost, //calculate total parent and child cost
        created_at: d.created_at,
        id: d.id || null,
        parent: d.parent ? {
          value: d.parent && d.parent.id || null,
          label: d.parent && d.parent.product_name || null,
        } : null,
        product_name: d.product_name,
        qty: d.qty,
        updated_at: d.updated_at,
      }
    });
  }

  public getValue(param: any): any {
    let ret: any = param;
    if (typeof (param) === 'object') {

      ret = param.label;
    }
    return ret;
  }

  public ddUpdate = (parent: any, child: any): void =>
    this.ddUpdateEmitter.emit({ parent, child });

  ngOnInit(): void {
    if (!this.cols.includes('action_col'))
      this.cols.push('action_col');
  }

  ngAfterViewInit(): void {
    if (this.data && this.data.length > 0) {
      this.setData(this.formatItems(this.data));
    }
    this.cdRef.detectChanges();
  }

  public onTriggerFunc = (): void => this.colFunc();

  public isColControl(i: number): boolean {
    return this.colControlIndex === i;
  }

  public isLastElement(arr: any[], i: number): boolean {
    return (arr.length - 1) === i;
  }

  private setData(data: any): void {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data && changes.data.currentValue) {
      this.setData(this.formatItems(changes.data.currentValue));
    }
  }

  public get displayedCols(): string[] {
    return this.cols.slice(1);
  }
}
