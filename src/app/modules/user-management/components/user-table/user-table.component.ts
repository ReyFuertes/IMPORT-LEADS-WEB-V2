import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IDropdownSelect, ISimpleItem } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getAllUsersSelector } from '../../store/user-mgmt.selectors';
import { Observable } from 'rxjs';
import { IUserMgmt, IUserTableData, IUserAccess } from '../../user-mgmt.model';
import { takeUntil, tap, take } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { getAccessSelector, getAllRolesSelector } from 'src/app/store/selectors/app.selector';
import { saveUserAccessAction, loadAllUsersAction, saveUserRoleAction, deleteUserAction } from '../../store/user-mgmt.actions';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';

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
  public apiImagePath: string = environment.apiImagePath;
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
  public rolesOptions: ISimpleItem[] = [];
  public defaultPageSize: number = 25;
  public pageSizeOptions: number[] = [10, 15, 25, 100];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public isAccessOrRoles(col: string): ISimpleItem[] {
    return col === 'access' ? this.accessOptions : this.rolesOptions;
  }

  constructor(private dialog: MatDialog, private router: Router, private store: Store<AppState>) {
    super();
    this.$users = this.store.pipe(select(getAllUsersSelector));
    this.$users.pipe(takeUntil(this.$unsubscribe),
      take(2),
      tap((res) => {
        if (res && res.length > 0) {
          this.dataSource = res;
          this.dataSource.paginator = this.paginator;
          this.cols = Object.keys(res[0])
            .filter(r => !this.excludedCols.includes(r));
        }
      })).subscribe();

    this.store.pipe(select(getAccessSelector))
      .pipe(take(1), tap(res => {
        if (res) this.accessOptions = res;
      })).subscribe();

    this.store.pipe(select(getAllRolesSelector)).pipe(take(2), tap(res => {
      if (res) this.rolesOptions = res;
    })).subscribe();

    /* trigger reload to all users so we will get the updated data */
    this.store.dispatch(loadAllUsersAction());
  }

  ngOnInit(): void { }

  public toDetail(id: string): void {
    this.router.navigateByUrl(`/dashboard/user-management/${id}/detail`);
  }

  public onDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          setTimeout(() => {
            this.store.dispatch(deleteUserAction({ id }));
          }, 200);
        }
      });
  }

  public fmtToIds(values: any, col: string): string[] {
    let ret: any[];
    switch (col) {
      case 'access':
        ret = values
          && values.user_access.length > 0
          && values.user_access.map(i => i.access && i.access.id) || [];
        return ret;
      case 'role':
        ret = values
          && values.user_role.length > 0
          && values.user_role.map(i => i.role && i.role.id) || [];
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
          user: { id: item._id },
          access: { id: event.value }
        }, _.identity);

        if (payload) {
          this.store.dispatch(saveUserAccessAction({ payload }));
        }
        break;
      case 'role':
        this.store.dispatch(saveUserRoleAction({
          payload: {
            user_role: {
              id: event.value,
              role_name: event.label
            },
            user: { id: item._id }
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