import { ITag } from './tags.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagsService extends BaseService<ITag> {
  constructor(http: HttpClient) {
    super(http, 'tags');
  }
}
