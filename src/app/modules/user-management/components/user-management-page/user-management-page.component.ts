import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { MatDialog } from '@angular/material/dialog';
import { UserAddDialogComponent } from 'src/app/modules/dialogs/components/users/user-add-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { loadAllUsersAction } from '../../store/user-mgmt.actions';

@Component({
  selector: 'il-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent extends GenericDestroyPageComponent implements OnInit {
  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { 
    this.store.dispatch(loadAllUsersAction());
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(UserAddDialogComponent, {
      width: '672px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {

      });
  }
}
