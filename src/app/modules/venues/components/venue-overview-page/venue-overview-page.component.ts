import { getVenuesSelector } from './../../store/venues.selector';
import { getVenues } from './../../store/venues.reducer';
import { Observable } from 'rxjs';
import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { IVenue, IVenuesAddress } from '../../venues.models';
import { VenuesAddDialogComponent } from 'src/app/modules/dialogs/components/venues-add/venues-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'il-venue-overview-page',
  templateUrl: './venue-overview-page.component.html',
  styleUrls: ['./venue-overview-page.component.scss']
})

export class VenueOverviewPageComponent implements OnInit {
  public isProduct: boolean = true;
  public venueProducts: IVenue[];

  public ctColsProduct: Array<{ label: string, width?: string | number }> = [
    {
      label: 'Venue name',
      width: 19
    },
    {
      label: 'Location',
      width: 15
    },
    {
      label: 'Related products',
      width: 20
    },
    {
      label: 'Contracts',
      width: '100px'
    },
    {
      label: 'Inspections',
      width: '100px'
    },
    {
      label: 'Avg. pass/fail',
      width: '100px'
    },
    {
      label: 'Rating',
      width: '100px'
    },
    {
      label: '',
    }
  ];

  public venueAddress: IVenuesAddress[] = [
    {
      id: 1,
      name: 'Canhui toys limited ',
      location: 'Haizhu Qu, Guangzhou Shi, Guangdong Sheng Cina',
      contactPerson: 'Tammy Li',
      phone: '+86 10 0000 0000'
    },
    {
      id: 2,
      name: 'Dengsheng furniture',
      location: 'Haizhu Qu, Guangzhou Shi, Guangdong Sheng Cina',
      contactPerson: 'Tammy Li',
      phone: '+86 10 0000 0000'
    },
    {
      id: 3,
      name: 'Landy Jewerlry Co.,Ltd',
      location: 'Haizhu Qu, Guangzhou Shi, Guangdong Sheng Cina',
      contactPerson: 'Tammy Li',
      phone: '+86 10 0000 0000'
    },
    {
      id: 4,
      name: 'Sankou Electronic Technology',
      location: 'Haizhu Qu, Guangzhou Shi, Guangdong Sheng Cina',
      contactPerson: 'Tammy Li',
      phone: '+86 10 0000 0000'
    },
    {
      id: 5,
      name: 'Winyea toys Limited ',
      location: 'Haizhu Qu, Guangzhou Shi, Guangdong Sheng Cina',
      contactPerson: 'Tammy Li',
      phone: '+86 10 0000 0000'
    }
  ];

  public ctColsAddress: Array<{ label: string, width?: string | number }> = [
    {
      label: 'Venue name',
      width: 23
    },
    {
      label: 'Location',
      width: 55
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
    this.store.pipe(select(getVenuesSelector)).subscribe(venues => {
      this.venueProducts = venues.map(vp => {
        return {
          id: vp.id,
          name: vp.name,
          rating: vp.rating,
          location: vp.location,
          contracts: vp.contracts,
          avg_pass_fail: vp.avg_pass_fail,
          inspections: vp.inspections,
          related_products: vp.related_products
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
    const dialogRef = this.dialog.open(VenuesAddDialogComponent, { data: this.isProduct });
    dialogRef.afterClosed().subscribe(result => { });
  }
}
