import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { ICategoryTemplate } from 'src/app/modules/contracts/contract.model';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { deleteUserSettingCategoryTemplateAction } from '../../store/actions/user-setting.action';
import { getUserSettingCategoryTemplatesSelector } from '../../store/selectors/user-setting.selector';

@Component({
  selector: 'il-user-category-template',
  templateUrl: './user-category-template.component.html',
  styleUrls: ['./user-category-template.component.scss']
})
export class UserSettingCategoryTemplateComponent extends GenericDestroyPageComponent implements OnInit {
  public categoryTemplates: ICategoryTemplate[];
  public items: MenuItem[];

  constructor(private dialog: MatDialog, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.store.pipe(select(getUserSettingCategoryTemplatesSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(categoryTemplates => {
        this.categoryTemplates = categoryTemplates;
      });
  }

  public onEdit(): void { }

  public get hasCategoryTemplates(): boolean {
    return this.categoryTemplates?.length > 0;
  }

  public onDelete(categoryTemplate: ICategoryTemplate): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        const { id } = categoryTemplate;
        if (result && id) {
          this.store.dispatch(deleteUserSettingCategoryTemplateAction({ id }));
        }
      });
  }
}
