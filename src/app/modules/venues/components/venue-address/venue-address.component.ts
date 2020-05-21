import { addVenue } from './../../store/venues.action';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../store/app.reducer';
import { MatDialog } from '@angular/material/dialog';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { IVenue } from './../../venues.models';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { deleteVenue } from '../../store/venues.action';
@Component({
  selector: 'il-venue-address',
  templateUrl: './venue-address.component.html',
  styleUrls: ['./venue-address.component.scss']
})

export class VenueAddressComponent extends GenericRowComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public selectedItem: IVenue;
  public selectedId: string;
  public rates = new Array(5);
  public dragStart: boolean = false;

  @Input()
  public items: IVenue[];
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    super();
  }

  ngOnInit() { }

  public dragStarted(event: any) {
    this.dragStart = event;
  }

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

  private reset(): void {
    this.hoveredIndex = null;
    this.selectedIndex = null;
    this.onClose();
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
}
