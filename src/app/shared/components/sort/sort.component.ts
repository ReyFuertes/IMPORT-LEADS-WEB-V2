import { environment } from '../../../../environments/environment';
import { Component, OnInit, EventEmitter, Input, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'il-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})

export class SortComponent extends GenericDestroyPageComponent implements AfterViewInit {
  public svgPath: string = environment.svgPath;

  @Output() public sortEmitter = new EventEmitter<any>();
  @Input() public options: Array<{ label: string, value: any }> = [];

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, public translateService: TranslateService) {
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

  public onClick(option: any): void {
    this.sortEmitter.emit(option);
  }
}
