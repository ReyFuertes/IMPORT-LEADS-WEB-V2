import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'il-contract-category-title',
  templateUrl: './contract-category-title.component.html',
  styleUrls: ['./contract-category-title.component.scss']
})
export class ContractCategoryTitleComponent extends GenericDestroyPageComponent implements AfterViewInit {
  public svgPath: string = environment.svgPath;

  @Input() public specification: { id: number, title: string };
  @Output() public removeSpecTitleEmitter = new EventEmitter<number>();

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, public translateService: TranslateService) { super(); }

  ngAfterViewInit(): void {
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public onRemoveTitle(id: number): void {
    this.removeSpecTitleEmitter.emit(id);
  }
}
