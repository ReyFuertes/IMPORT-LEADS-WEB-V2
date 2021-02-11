import { updateVenueAction, addVenueAction, uploadVenueImageAction } from './../../store/venues.action';
import { getVenuesSelector } from './../../store/venues.selector';
import { Observable } from 'rxjs';
import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { IVenue } from '../../venues.models';
import { VenuesAddDialogComponent } from 'src/app/modules/dialogs/components/venues-add/venues-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';

@Component({
  selector: 'il-venue-overview-page',
  templateUrl: './venue-overview-page.component.html',
  styleUrls: ['./venue-overview-page.component.scss']
})

export class VenueOverviewPageComponent extends GenericDestroyPageComponent implements OnInit {
  public isProduct: boolean = true;
  public venues: IVenue[];
  public colProducts: Array<{ label: string, width?: any }> = [
    {
      label: 'Venue name',
      width: 30.2
    },
    {
      label: 'Location',
      width: 50
    },
    // {
    //   label: 'Related products',
    //   width: 18
    // },
    {
      label: 'Contracts',
      width: '100px'
    },
    // {
    //   label: 'Inspections',
    //   width: '100px'
    // },
    {
      label: 'Avg. pass/fail',
      width: '100px'
    },
    // {
    //   label: 'Rating',
    //   width: '100px'
    // },
    {
      label: '',
      width: '60px'
    }
  ];
  public colAddress: Array<{ label: string, width?: any }> = [
    {
      label: 'Venue name',
      width: 27.5
    },
    {
      label: 'Location',
      width: 50
    },
    {
      label: 'Contacts',
      width: '150px'
    },
    {
      label: 'Phone Number',
      width: '150px'
    },
    {
      label: '',
      width: '100px'
    }
  ];

  public $venues: Observable<IVenue[]>;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    super();
    this.store.pipe(select(getVenuesSelector), takeUntil(this.$unsubscribe))
      .subscribe(venues => {
        this.venues = venues.map(vp => {
          return {
            id: vp.id,
            name: vp.name,
            rating: vp.rating,
            location: vp.location,
            avg_pass_fail: vp.avg_pass_fail,
            inspections: vp.inspections,
            related_products: vp.related_products,
            contact: vp.contact,
            phone: vp.phone,
            contract_count: vp.contract_count,
            image: vp.image
          }
        });
      });
  }

  ngOnInit() { }

  public onProductClick() {
    this.isProduct = true;
  }

  public onAddressClick() {
    this.isProduct = false;
  }

  public onAddVenues(): void {
    const dialogRef = this.dialog.open(VenuesAddDialogComponent,
      {
        width: '550px',
        height: '450px',
        data: this.isProduct
      });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe((item: IVenue) => {
        if (item) {
          this.store.dispatch(uploadVenueImageAction({ file: item.file }));
          delete item.file;

          this.store.dispatch(addVenueAction({ item }));
        }
      });
  }
}
