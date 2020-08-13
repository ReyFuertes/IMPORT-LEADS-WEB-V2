
import { ISavedChecklistItem, ISavedChecklistPayload } from './../contract.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SavedChecklistService extends BaseService<ISavedChecklistItem | ISavedChecklistPayload> {
  constructor(http: HttpClient) {
    super(http, 'saved-checklist');
  }
}
