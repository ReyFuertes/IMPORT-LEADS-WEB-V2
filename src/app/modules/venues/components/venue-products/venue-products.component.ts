import { take, map, takeUntil } from 'rxjs/operators';
import { IvenueProduct, IVenue, IRelatedProduct } from './../../venues.models';
import { removeVenueProduct } from './../../store/venue-product.action';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { addVenueAction, deleteVenueAction, uploadVenueImageAction, updateVenueAction } from './../../store/venues.action';
import { AppState } from './../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
@Component({
  selector: 'il-venue-products',
  templateUrl: './venue-products.component.html',
  styleUrls: ['./venue-products.component.scss']
})

export class VenueProductsComponent extends GenericRowComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public imageApiPath: string = environment.apiImagePath
  @Input()
  public items: IVenue[];
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  @Input()
  public colsHeader: Array<{ label: string, width?: any }>;
  public rates = new Array(5);
  @Input()
  public isProduct: boolean;
  @Output()
  public valueEmitter = new EventEmitter<IVenue>();
  public selectedItem: IVenue;
  public selectedId: string;
  public dragStart: boolean = false;
  public base64Image: any;

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    super();

  }

  ngOnInit() { }

  public uploadImage(event: any, item: IVenue): void {
    const file: File = event.target.files[0];
    const filename = `${uuid()}.${file.name.split('?')[0].split('.').pop()}`;
    convertBlobToBase64(file)
      .pipe(take(1),
        takeUntil(this.$unsubscribe),
        map(() => {
          return {
            size: file.size,
            mimetype: file.type
          }
        }))
      .subscribe(b64 => {
        if (b64) {
          /* upload new image */
          const dataFile = new FormData();
          dataFile.append('file', file, filename);
          this.store.dispatch(uploadVenueImageAction({ file: dataFile }));

          /* update venue image */
          item.image = _.pickBy({
            filename,
            mimetype: b64.mimetype,
            size: b64.size,
            id: item.image ? item.image.id : null
          }, _.identity);
          this.store.dispatch(updateVenueAction({ item }));
        }
      })
  }

  public onEdit(item: IVenue, key: string, value: string): void {
    if (value)
      item[key] = value;

    this.selectedItem = item;
  }

  public onSave(): void {
    if (this.selectedItem) {
      this.store.dispatch(addVenueAction({ item: this.selectedItem }));
      this.selectedItem = null;
      this.reset();
    }
  }

  public onDelete = (id: string) => this.selectedId = id;

  public dragStarted(event: any) {
    this.dragStart = event;
  }

  public onRemoveProduct(item: IvenueProduct): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: {
        action: 0
      }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          setTimeout(() => {
            this.store.dispatch(removeVenueProduct({ item }))
          }, 100);
        }
      });
  }

  public getToolTip(product: IRelatedProduct[]): string {
    let tooltip = '';
    for (const entry of product) {
      tooltip = tooltip + entry.product_name + '\n';
    }
    return tooltip;
  }

  public onClickPnl(pnl: any, event: any, i: number, item: IVenue): void {
    if (item && item.related_products && item.related_products.length === 0) {
      pnl.close();
    }

    if (item)
      this.selectedItem = item;

    if (event.target.classList.contains('no-expand')) {
      pnl.close();
    }

    if (event.target.classList.contains('delete')) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '410px',
        data: {
          action: 0
        }
      });
      dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe)).subscribe(result => {
        if (result) {
          setTimeout(() => {
            this.store.dispatch(deleteVenueAction({ id: this.selectedId }));
          }, 100);
        }
      });
      pnl.close();
    }

    if (event.target.classList.contains('edit')) {
      this.selectedIndex = i;
      pnl.close();
    }

    if (event.target.classList.contains('close')) {
      this.selectedIndex = null;
      pnl.close();
    }
  }

  private reset(): void {
    this.hoveredIndex = null;
    this.selectedIndex = null;
    this.onClose();
  }
}
