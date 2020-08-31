import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IDropdownSelect, ISimpleItem } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getAllUsersSelector } from '../../store/user-mgmt.selectors';
import { Observable } from 'rxjs';
import { IUserMgmt, IUserTableData } from '../../user-mgmt.model';
import { takeUntil, tap } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { getAccessSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserTableComponent extends GenericDestroyPageComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public dataSource: any;
  public columnsToDisplay = ['name', 'position', 'role', 'company', 'phone', 'access', 'action'];
  public expandedElement: IUserMgmt | null;
  public accessOptions: ISimpleItem[];
  public noExpandCols: number[] = [2, 5, 6];
  public $users: Observable<IUserMgmt[]>;
  public users: IUserTableData[];
  public cols: any;
  public excludedCols: string[] = ['id', '_id', 'name', 'self_intro'];
  public rolesOptions: ISimpleItem[] = [{
    label: 'Inspector',
    value: 'inspector'
  }, {
    label: 'Manager',
    value: 'manager'
  }, {
    label: 'User',
    value: 'user'
  }];
  public defaultPageSize: number = 25;
  public pageSizeOptions: number[] = [10, 15, 25, 100];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public isAccessOrRoles(i: number): ISimpleItem[] {
    return i === 2 ? this.rolesOptions : this.accessOptions;
  }

  constructor(private router: Router, private store: Store<AppState>) {
    super();
    this.$users = this.store.pipe(select(getAllUsersSelector));
    this.$users.pipe(takeUntil(this.$unsubscribe),
      tap((res) => {
        if (res && res.length > 0) {
          this.dataSource = res;
          this.dataSource.paginator = this.paginator;
          this.cols = Object.keys(res[0])
            .filter(r => !this.excludedCols.includes(r));
        }
      })).subscribe();

    this.store.pipe(select(getAccessSelector))
      .pipe(tap(res => {
        if (res) this.accessOptions = res;
      }))
      .subscribe();
  }

  ngOnInit(): void { }

  public toDetail(id: string): void {
    this.router.navigateByUrl(`/dashboard/user-management/${id}/detail`);
  }

  public onExpand(el: IUserMgmt, i: any): any {
    const id = i.target.getAttribute('id');
    debugger
    if (!this.isNoExpand(Number(id)) && this.expandedElement !== el) {
      this.expandedElement = el;
    } else {
      this.expandedElement = null;
    }
    console.log(this.expandedElement, i.target)
    return this.expandedElement;
  }

  public isLast(arr: any[], i: number): boolean {
    return arr && (i === (arr.length - 1));
  }

  public fmtToTitlecase(value: string): string {
    return value.replace(/_/g, ' ');
  }

  public isNoExpand(i: number): boolean {
    return this.noExpandCols.includes(i);
  }
}