import { getTagsSelector } from './../../store/selectors/tags.selector';
import { Observable } from 'rxjs';
import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITag } from '../../tags.model';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { loadTagsAction } from '../../store/actions/tags.actions';

@Component({
  selector: 'il-tag-overview-page',
  templateUrl: './tag-overview-page.component.html',
  styleUrls: ['./tag-overview-page.component.scss']
})

export class TagOverviewPageComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public sortOptions = [{
    label: 'Sort by Name',
    value: 'tag_name'
  }, {
    label: 'Sort by Date',
    value: 'date'
  }];
  public $items: Observable<ITag[]>;
  public sortedBy: string;

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

  public ngAfterViewInit(): void {
    this.setSortingToLocal();
  }

  private setSortingToLocal(): void {
    const hasSort = localStorage.getItem('tagsSortBy');
    if (hasSort) {
      const str = JSON.parse(hasSort)?.split('=');
      const strSortedBy = str[1]?.replace(/[\[\]']+/g, '')?.split(',')[0]?.toUpperCase();

      this.sortedBy = 'Sorted by: ' + strSortedBy?.replace('.', ' ')?.replace('_', ' ');
      this.cdRef.detectChanges();
    }
  }

  public handleSortChanges(event: any): void {
    let orderBy: string;
    const hasSort = localStorage.getItem('tagsSortBy');
    if (hasSort) {
      const str = JSON.parse(hasSort)?.split('=');
      orderBy = str[1]?.replace(/[\[\]']+/g, '')?.split(',')[1];
    } else {
      orderBy = 'ASC';
    }

    if (orderBy === 'ASC') orderBy = 'DESC'
    else orderBy = 'ASC';
 
    localStorage.setItem('tagsSortBy', JSON.stringify(`?orderby=[${event?.value},${orderBy}]`));
    this.store.dispatch(loadTagsAction({ param: `?orderby=[${event?.value},${orderBy}]` }));
    this.setSortingToLocal();
  }
}
