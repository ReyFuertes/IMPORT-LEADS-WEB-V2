import { ITagQuestion } from './../tags.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({ providedIn: 'root' })
export class TagQuestionsService extends BaseService<ITagQuestion> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'tag-questions', storageSrv);
  }
}
