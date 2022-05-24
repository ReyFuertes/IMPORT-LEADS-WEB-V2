import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { IRelatedProduct } from '../../venues.models';

@Component({
  selector: 'il-venue-expansion-list',
  templateUrl: './venue-expansion-list.component.html',
  styleUrls: ['./venue-expansion-list.component.scss']
})

export class VenueExpansionListComponent extends GenericDestroyPageComponent implements AfterViewInit {
  @Input() public items: IRelatedProduct[];
  @Input()
  public colsHeader: Array<{ label: string, width?: any }> = [{
    label: '',
    width: 15
  }, {
    label: 'Configured products',
    width: 20
  }, {
    label: 'Avg. Price',
    width: '100px'
  },{
    label: 'Qnt. of items',
    width: '100px'
  }];
  constructor(private cdRef: ChangeDetectorRef, private store: Store<AppState>, public translateService: TranslateService) {
    super();
  }

  ngAfterViewInit(): void {
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public dragStarted(event: any) {
    this.dragStart = event;
  }
}
