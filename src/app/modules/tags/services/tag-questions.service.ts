import { ITagQuestion } from './../tags.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagQuestionsService extends BaseService<ITagQuestion> {
  constructor(http: HttpClient) {
    super(http, 'tag-questions');
  }
}
