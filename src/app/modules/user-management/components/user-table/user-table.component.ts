import { Component, OnInit } from '@angular/core';
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
  public dataSource: any;
  public columnsToDisplay = ['name', 'position', 'role', 'company', 'phone', 'access'];
  public expandedElement: IUserMgmt | null;
  public accessOptions: ISimpleItem[] = [
    {
      value: '1',
      label: 'Contracts'
    },
    {
      value: '2',
      label: 'Inspections'
    },
    {
      value: '3',
      label: 'Executing Inspections'
    },
    {
      value: '4',
      label: 'Data Pages'
    },
    {
      value: '5',
      label: 'Platform Settings'
    },
    {
      value: '6',
      label: 'Chat'
    },
  ];
  public noExpandCols: number[] = [2, 5];
  public $users: Observable<IUserMgmt[]>;
  public users: IUserTableData[];
  public cols: any;
  public excludedCols: string[] = ['id', '_id', 'name', 'self_intro'];

  constructor(private store: Store<AppState>) {
    super();
    this.$users = this.store.pipe(select(getAllUsersSelector));
    this.$users.pipe(takeUntil(this.$unsubscribe),
      tap((res) => {
        if (res && res.length > 0) {
          this.dataSource = res;
          this.cols = Object.keys(res.shift())
            .filter(r => !this.excludedCols.includes(r));

          console.log(this.cols)
        }
      })).subscribe();
  }

  ngOnInit(): void { }

  public onExpand(el: IUserMgmt, i: any): any {
    const id = i.target.getAttribute('id');

    if (!this.isNoExpand(Number(id)) && this.expandedElement !== el) {
      this.expandedElement = el;
    } else {
      this.expandedElement = null;
    }
    console.log(this.expandedElement, i.target)
    return this.expandedElement;
  }

  public fmtToTitlecase(value: string): string {
    return value.replace(/_/g, ' ');
  }

  public isNoExpand(i: number): boolean {
    return this.noExpandCols.includes(i);
  }
}