import { QueryParam } from './../models/generic.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Directive } from '@angular/core';

@Directive()
export abstract class BaseService<T> {
  protected baseUrl: string;

  constructor(
    public http: HttpClient,
    private entity: string = '') {
    this.baseUrl = environment.apiUrl;
  }

  private getToken(): string {
    return JSON.parse(localStorage.getItem('at') || null) ?
      JSON.parse(localStorage.getItem('at')).accessToken : null;
  }

  protected commonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  private setEntityParam(param: string): any {
    return param ? ['/', param].join('') : '';
  }

  private removeNullProps(obj: any): any {
    let ret: any;
    if (!Array.isArray(obj)) {
      ret = _.pickBy(obj, _.identity);
    } else {
      ret = Object.values(_.pickBy(obj, o => o !== null && o !== undefined));
    }
    return ret;
  }

  public post(object?: T | T[], param?: string): Observable<T | T[]> {
    return this.http.post<T>(`${this.baseUrl}${this.entity}${this.fmtParam(param)}`,
      this.removeNullProps(object),
      { headers: this.commonHeaders() });
  }

  public delete(id?: string, param?: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.entity}/${id}${this.fmtParam(param)}`,
      { headers: this.commonHeaders() });
  }

  public patch(object: T | any, addtnlParam?: string): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${this.entity}${this.fmtParam(addtnlParam)}`,
      this.removeNullProps(object),
      { headers: this.commonHeaders() }
    );
  }

  private fmtParam(param?: string): string {
    return `${param ? '/' + param : ''}`
  }

  public getAll(param?: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${this.entity}${this.fmtParam(param)}`, { headers: this.commonHeaders() });
  }

  public getById(id: string, addtnlParam?: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${this.entity}/${id}${this.fmtParam(addtnlParam)}`, { headers: this.commonHeaders() });
  }

  public upload(object?: any, addtnlParam?: string): Observable<T> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      Accept: "application/json"
    });
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<T>(`${this.baseUrl}${this.entity}${this.fmtParam(addtnlParam)}`, object, { headers: headers });
  }
}
