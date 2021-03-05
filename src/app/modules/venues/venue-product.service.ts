import { IVenue, IvenueProduct } from './venues.models';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({ providedIn: 'root' })
export class VenueProductsService extends BaseService<IvenueProduct> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'venue-products', storageSrv);
  }
}
