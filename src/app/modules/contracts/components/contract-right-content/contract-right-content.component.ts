import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { FormGroup } from '@angular/forms';
import { BriefDialogComponent } from './../../../dialogs/components/brief/brief-dialog.component';
import { AQLDialogComponent } from './../../../dialogs/components/aql/aql-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ISavedChecklistItem } from '../../contract.model';
import { getAllSavedChecklistSelector } from '../../store/selectors/saved-checklist.selector';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { getSavedChecklistByIdAction } from '../../store/actions/saved-checklist.action';
import { IUser, IUserMgmt } from 'src/app/modules/user-management/user-mgmt.model';
import { getAllSimpleUsersSelector } from 'src/app/modules/user-management/store/user-mgmt.selectors';
import { getUserListSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-contract-right-content',
  templateUrl: './contract-right-content.component.html',
  styleUrls: ['./contract-right-content.component.scss']
})

export class ContractRightContentComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public $savedChecklist: Observable<ISavedChecklistItem[]>;
  public $userList: Observable<ISimpleItem[]>;

  @Input() public form: FormGroup;
  @Output() public closeEmitter = new EventEmitter<boolean>();
  @ViewChild('scrollPnl', { static: true }) public scrollPnl: any;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.$savedChecklist = this.store.pipe(select(getAllSavedChecklistSelector));
    this.$userList = this.store.pipe(select(getUserListSelector));
    this.$userList.subscribe(res => console.log(res))
  }

  public getChecklist(id: string): void {
    this.store.dispatch(getSavedChecklistByIdAction({ id }));
  }

  public addBrief(): void {
    const dialogRef = this.dialog.open(BriefDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  public addAql(): void {
    const dialogRef = this.dialog.open(AQLDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
}
