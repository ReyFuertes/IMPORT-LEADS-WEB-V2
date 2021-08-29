import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { MatDialog } from '@angular/material/dialog';
import { UserAddDialogComponent } from 'src/app/modules/dialogs/components/users/user-add-dialog.component';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { loadAllUsersAction } from '../../store/user-mgmt.actions';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent extends GenericDestroyPageComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef, public translateService: TranslateService, private store: Store<AppState>, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { 
    this.store.dispatch(loadAllUsersAction());
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(UserAddDialogComponent, {
      width: '672px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => { });
  }
}
