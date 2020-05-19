import { IVenue, IvenueProduct } from './venues.models';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VenueProductsService extends BaseService<IvenueProduct> {
  constructor(http: HttpClient) {
    super(http, 'venue-products');
  }
}
