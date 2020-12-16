import { ICategoryTemplate, IContractCategory } from './../contract.model';
import { IContract } from '../contract.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryTemplateService extends BaseService<ICategoryTemplate> {
  constructor(http: HttpClient) {
    super(http, 'category-template');
  }
}
