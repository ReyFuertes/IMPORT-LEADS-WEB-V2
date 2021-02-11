import { addProductAction } from './../../store/products.actions';
import { take, takeUntil } from 'rxjs/operators';
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
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';

@Component({
  selector: 'il-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})

export class ProductsPageComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public items: IProduct[];

  constructor(private cdRef: ChangeDetectorRef, private dialog: MatDialog, private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.store.pipe(select(getProductsSelector), takeUntil(this.$unsubscribe))
      .subscribe(res => {
        this.items = res;
      })
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public addProductAction(): void {
    const dialogRef = this.dialog.open(ProductAddDialogComponent, {
      data: { state: AddEditState.Add }
    });
    dialogRef.afterClosed().subscribe((item) => {
      if (item) {
        this.store.dispatch(addProductAction({ item }))
      }
    });
  }
}
