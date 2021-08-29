import { getTagsSelector } from './../../store/selectors/tags.selector';
import { Observable } from 'rxjs';
import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITag } from '../../tags.model';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-tag-overview-page',
  templateUrl: './tag-overview-page.component.html',
  styleUrls: ['./tag-overview-page.component.scss']
})

export class TagOverviewPageComponent extends GenericDestroyPageComponent implements OnInit {
  public $items: Observable<ITag[]>;
  constructor(private cdRef: ChangeDetectorRef, public translateService: TranslateService, private store: Store<AppState>, public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.$items = this.store.pipe(select(getTagsSelector), takeUntil(this.$unsubscribe));
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }
}
