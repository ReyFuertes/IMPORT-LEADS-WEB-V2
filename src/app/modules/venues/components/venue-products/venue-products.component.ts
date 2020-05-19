import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { addVenue, deleteVenue } from './../../store/venues.action';
import { AppState } from './../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ISimpleItem } from '../../../../shared/generics/generic.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { IVenue, IRelatedProduct } from '../../venues.models';

@Component({
  selector: 'il-venue-products',
  templateUrl: './venue-products.component.html',
  styleUrls: ['./venue-products.component.scss']
})

export class VenueProductsComponent extends GenericRowComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: IVenue[];
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;
  public rates = new Array(5);
  @Input()
  public isProduct: boolean;
  @Output()
  public valueEmitter = new EventEmitter<IVenue>();
  public selectedItem: IVenue;
  public selectedId: string;
  public dragStart: boolean = false;

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    super();

  }

  ngOnInit() { }

  public onEdit(item: IVenue, key: string, value: string): void {
    if (value)
      item[key] = value;

    this.selectedItem = item;
  }

  public onSave(): void {
    if (this.selectedItem) {
      this.store.dispatch(addVenue({ item: this.selectedItem }));
      this.selectedItem = null;
      this.reset();
    }
  }

  public onDelete = (id: string) => this.selectedId = id;

  public dragStarted(event: any) {
    this.dragStart = event;
  }

  public getToolTip(product: IRelatedProduct[]): string {
    let tooltip = '';
    for (const entry of product) {
      tooltip = tooltip + entry.product_name + '\n';
    }
    return tooltip;
  }

  public onClickPnl(pnl: any, event: any, i: number, item: IVenue): void {
    if (item)
      this.selectedItem = item;

    if (event.target.classList.contains('no-expand')) {
      pnl.close();
    }

    if (event.target.classList.contains('delete')) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '410px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          setTimeout(() => {
            this.store.dispatch(deleteVenue({ id: this.selectedId }));
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
