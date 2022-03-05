import { Component, ViewChild, SimpleChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getTableUsersSelector } from '../../store/user-mgmt.selectors';
import { Observable, of } from 'rxjs';
import { IUserMgmt, IUserTableData, IUser } from '../../user-mgmt.model';
import { takeUntil, tap, take, debounceTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { getAllAccessSelector, getAllRolesSelector, getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { saveUserAccessAction, saveUserRoleAction, deleteUserAction } from '../../store/user-mgmt.actions';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
import { splitToSentCase } from 'src/app/shared/util/format-value';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { USERMNGMNTROUTE, VIEWPERMISSIONROUTE } from 'src/app/shared/constants/routes';
import { TranslateService } from '@ngx-translate/core';
import { IUserProfile } from 'src/app/modules/users/users.models';

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
export class UserTableComponent extends GenericContainer implements AfterViewInit {
  public apiImagePath: string = environment.apiImagePath;
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public dataSource: any;
  public columnsToDisplay = ['email', 'position', 'role', 'company_name', 'phone', 'access', 'action'];
  public expandedElement: IUserMgmt | null;
  public accessOptions: ISimpleItem[];
  public noExpandCols: number[] = [2, 5, 6];
  public $users: Observable<IUserMgmt[]>;
  public users: IUserTableData[];
  public cols: any;
  public excludedCols: string[] = ['id', '_id', 'name', 'self_intro'];
  public rolesOptions: ISimpleItem[] = [];
  public defaultPageSize: number = 25;
  public pageSizeOptions: number[] = [10, 15, 25, 100];
  public splitToSentCase = splitToSentCase;
  public viewPermissionRoute = VIEWPERMISSIONROUTE;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public isAccessOrRoles(col: string): ISimpleItem[] {
    return col === 'access' ? this.accessOptions : this.rolesOptions;
  }

  constructor(public translateService: TranslateService, private cdRef: ChangeDetectorRef, private dialog: MatDialog, private router: Router, private store: Store<AppState>) {
    super();
  }

  private setData(data: any): void {
    if (data?.length > 0) {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit(): void {
    this.$users = this.store.pipe(select(getTableUsersSelector));
    this.$users.pipe(debounceTime(100), takeUntil(this.$unsubscribe),
      tap((res) => {
        const _res = res.filter(i => i !== undefined);
        if (_res && _res.length > 0) {
          this.setData(res);

          this.cols = Object.keys(res[0])
            .filter(r => !this.excludedCols.includes(r));
        }
      })).subscribe();

    this.store.pipe(select(getAllAccessSelector))
      .pipe(takeUntil(this.$unsubscribe)).subscribe(res => {
        if (res) {
          this.accessOptions = res?.map(value => {
            return {
              value: value?.value,
              label: value?.label
            }
          });
        }
      });

    this.store.pipe(select(getAllRolesSelector)).pipe(tap(res => {
      if (res) this.rolesOptions = res;
    })).subscribe();

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
        }
      });

    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data && changes.data.currentValue) {
      this.setData(changes.data.currentValue);
    }
  }

  public isExcludedCols(col: string): boolean {
    return ['user', 'database_name'].includes(col);
  }

  public toDetail(id: string): void {
    this.router.navigateByUrl(`${USERMNGMNTROUTE}/${id}/detail`);
  }

  public fmtItem(item: IUser, col?: string) {
    const _item = Object.assign({}, item);
    if (col === 'user_access') {
      return this.fmt(_item, 'user_access', 'label');
    } else if (col === 'user_role') {
      return this.fmt(_item, 'user_role', 'label');
    } else {
      return item[col] || '';
    }
  }

  public fmt(item: IUser, col: string, propName: string) {
    const value = Object.assign({}, item);
    return value[col]?.map(a => a?.label).join(', ') || '';
  }

  public onDelete(item: IUserProfile): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          this.store.dispatch(deleteUserAction({ id: item?.user?.id }));
        }
      });
  }

  public isAdmin(profile: IUserProfile): boolean {
    return profile?.user?.is_admin === true;
  }

  public fmtToIds(values: any, col: string): string[] {
    let ret: any[];
    switch (col) {
      case 'access':
        ret = values?.user_access?.map(i => i?.value) || [];
        return ret;
      case 'role':
        ret = values?.user_role?.map(i => i?.value) || [];
    }
    return ret;
  }

  public handleOptionValuesChange(event: ISimpleItem, item: IUserTableData, col: string): void {
    switch (col) {
      case 'access':
        const userAccess = item
          && item.access
          && item.access.filter(i => i.id === event.value).shift() || null;

        const payload = _.pickBy({
          id: userAccess ? userAccess.id : null,
          user: { id: item.user.id },
          access: { id: event.value }
        }, _.identity);

        if (payload) {
          this.store.dispatch(saveUserAccessAction({ payload }));
        }
        break;
      case 'role':
        this.store.dispatch(saveUserRoleAction({
          payload: {
            role: {
              id: event.value,
              role_name: event.label
            },
            user: { id: item.user.id }
          }
        }));
        break;
      default: break;
    }
  }

  public onExpand(el: IUserMgmt, i: any): any {
    const id = i.target.getAttribute('id');

    if (!this.isNoExpand(Number(id)) && this.expandedElement !== el) {
      this.expandedElement = el;
    } else {
      this.expandedElement = null;
    }

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