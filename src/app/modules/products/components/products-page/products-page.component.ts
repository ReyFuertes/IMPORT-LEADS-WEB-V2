import { addProduct } from './../../store/products.actions';
import { take } from 'rxjs/operators';
import { AddEditState } from './../../../../shared/generics/generic.model';
import { ProductAddDialogComponent } from './../../../dialogs/components/products-add/products-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { getProductsSelector } from './../../store/products.selector';
import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { IProduct } from './../../products.model';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'il-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})

export class ProductsPageComponent implements OnInit, AfterViewInit {
  public $products: Observable<IProduct[]>;
  public items: IProduct[];

  constructor(private cdRef: ChangeDetectorRef, private dialog: MatDialog, private store: Store<AppState>) {
    this.$products = this.store.pipe(select(getProductsSelector));
    this.$products.subscribe(res => {
      this.items = res//_.orderBy(res, ['product_name', 'parent.product_name'], ['asc', 'asc']);
    })
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public addProduct(): void {
    const dialogRef = this.dialog.open(ProductAddDialogComponent, {
      data: { state: AddEditState.Add }
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe((item) => {
      if (item) {
        setTimeout(() => {
          this.store.dispatch(addProduct({ item }))
        }, 2000);
      }
    });
  }
}
