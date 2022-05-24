import { take, map, takeUntil } from 'rxjs/operators';
import { IVenue, IRelatedProduct } from './../../venues.models';
import { removeVenueProduct } from './../../store/venue-product.action';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { deleteVenueAction, uploadVenueImageAction, updateVenueAction } from './../../store/venues.action';
import { AppState } from './../../../../store/app.reducer';
import { select, Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../../../environments/environment';
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import { getVenuesSelector } from '../../store/venues.selector';

@Component({
  selector: 'il-venue-products',
  templateUrl: './venue-products.component.html',
  styleUrls: ['./venue-products.component.scss']
})

export class VenueProductsComponent extends GenericRowComponent implements OnChanges {
  @Input() public items: IVenue[];
  @Input() public isProduct: boolean;
  @Output() public valueEmitter = new EventEmitter<IVenue>();

  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public imageApiPath: string = environment.apiImagePath;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public selectedItem: IVenue;
  public selectedId: string;
  public dragStart: boolean = false;
  public base64Image: any;
  public colsHeader: Array<{ label: string, width?: any }> = [{
    label: 'Venue name',
    width: 31
  }, {
    label: 'Location',
    width: 50
  }, {
    label: 'Contracts',
    width: '100px'
  }, {
    label: '',
    width: '60px'
  }];

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(private cdRef: ChangeDetectorRef, public dialog: MatDialog, private store: Store<AppState>) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void { }

  public uploadImage(event: any, item: IVenue): void {
    const file: File = event.target.files[0];

    const filename = `${uuid()}.${file.name.split('.').pop()}`;
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
          const dataFile = new FormData();
          dataFile.append('file', file, filename);
          this.store.dispatch(uploadVenueImageAction({ file: dataFile }));

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

  public onEdit(item: any, key: string, value: string): void {
    if (value) {
      try {
        item[key] = value;
      } catch (error) {
        const _item = Object.assign({}, item);
        _item[key] = value;
        item = _item;
      }
    }
    setTimeout(() => this.selectedItem = item, 100);
  }

  public onSpace(pnl: any, event: any): void {
    if (event.target.classList.contains('no-expand')) {
      pnl.close();
    }
  }

  public onSave(): void {
    if (this.selectedItem) {
      this.store.dispatch(updateVenueAction({ item: this.selectedItem }));
      this.selectedItem = null;
      this.reset();
    }
  }

  public onDelete = (id: string) => this.selectedId = id;

  public dragStarted(event: any) {
    this.dragStart = event;
  }

  public onRemoveProduct(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
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
    if (item && item.related_products && item.related_products.length === 0) { }

    if (item)
      this.selectedItem = item;

    if (event.target.classList.contains('no-expand')) { }

    if (event.target.classList.contains('delete')) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '410px',
        data: {
          action: 0
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          setTimeout(() => {
            this.store.dispatch(deleteVenueAction({ id: this.selectedId }));
          }, 100);
        }
      });
    }

    if (event.target.classList.contains('edit')) {
      this.selectedIndex = i;
    }

    if (event.target.classList.contains('close')) {
      this.selectedIndex = null;
    }
  }

  public close(): void {
    super.onClose();

    this.store.pipe(select(getVenuesSelector), takeUntil(this.$unsubscribe))
      .subscribe(venues => {
        if(this.items) {
          Object.assign(this.items, venues);
        }
      });
  }

  private reset(): void {
    this.hoveredIndex = null;
    this.selectedIndex = null;
    this.onClose();
  }
}
