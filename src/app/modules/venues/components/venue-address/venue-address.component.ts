import { addVenueAction, updateVenueAction, uploadVenueImageAction } from './../../store/venues.action';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { select, Store } from '@ngrx/store';
import { AppState } from './../../../../store/app.reducer';
import { MatDialog } from '@angular/material/dialog';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { IVenue } from './../../venues.models';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { deleteVenueAction } from '../../store/venues.action';
import { map, take, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'il-venue-address',
  templateUrl: './venue-address.component.html',
  styleUrls: ['./venue-address.component.scss']
})

export class VenueAddressComponent extends GenericRowComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public imageApiPath: string = environment.apiImagePath;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public selectedItem: IVenue;
  public selectedId: string;
  public rates = new Array(5);
  public dragStart: boolean = false;

  @Input() public items: IVenue[];
  @Input() public colsHeader: Array<{ label: string, width?: any }>;

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(private cdRef: ChangeDetectorRef, public translateService: TranslateService, public dialog: MatDialog, private store: Store<AppState>) {
    super();
  }

  ngOnInit() { 
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

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
      this.store.dispatch(addVenueAction({ item: this.selectedItem }));
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
        data: {
          action: 0
        }
      });
      dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
        .subscribe(result => {
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
}
