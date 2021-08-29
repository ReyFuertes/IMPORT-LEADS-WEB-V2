import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { saveUserPermissionAction } from '../../store/view-permission.actions';

@Component({
  selector: 'il-view-permission-page',
  templateUrl: './view-permission-page.component.html',
  styleUrls: ['./view-permission-page.component.scss']
})
export class ViewPermissionPageComponent extends GenericDestroyPageComponent implements OnInit {
  public sourceProducts: any[] = []
  public targetProducts: any[];

  constructor(private cdRef: ChangeDetectorRef, public translateService: TranslateService, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.targetProducts = [];
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public handleOnMoveToTarget(event: any[]): void {
    if (event?.shift()) {
      const payload = {

      };
      this.store.dispatch(saveUserPermissionAction({ payload }));
    }
  }

  public handleOnMoveToSource(event: any): void {
  }
}
