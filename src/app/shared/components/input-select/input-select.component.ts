import { ISimpleItem } from './../../generics/generic.model';
import { Component, OnInit, Input, ViewChild, ElementRef, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})

export class InputSelectComponent extends GenericDestroyPageComponent implements AfterViewInit {
  @Input() public suggestions: ISimpleItem[];
  @Input() public controlName: any;
  @Input() public form: FormGroup;
  @Input() public placeholder: string = 'Your product here..';
  @Input() public isReadOnly: boolean = false;

  public filtered: ISimpleItem[] | any[];

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

  public filter(event) {
    return this.filtered = this.filterArr(event.query, this.suggestions)
  };

  public filterArr(query, items: any[]): any[] {
    let filtered: any[] = [];
    items && items.forEach((item, i) => {
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    });
    return filtered;
  }
}
