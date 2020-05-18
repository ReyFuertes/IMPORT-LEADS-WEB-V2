import { IVenue } from './venues.models';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VenuesService extends BaseService<IVenue> {
  constructor(http: HttpClient) {
    super(http, 'venues');
  }
}
