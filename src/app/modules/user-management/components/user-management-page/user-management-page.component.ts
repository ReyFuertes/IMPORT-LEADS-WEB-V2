import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { MatDialog } from '@angular/material';
import { UserAddDialogComponent } from 'src/app/modules/dialogs/components/users/user-add-dialog.component';

@Component({
  selector: 'il-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent extends GenericDestroyPageComponent implements OnInit {
  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

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
