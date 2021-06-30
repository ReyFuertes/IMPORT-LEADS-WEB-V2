import { ISimpleItem } from './../../generics/generic.model';
import { GenericControl } from './../../generics/generic-control';
import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'il-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss']
})

export class DropdownSelectComponent extends GenericControl<ISimpleItem> implements AfterViewInit {
  @Input() public options: ISimpleItem[];
  @Input() public placeholder: string = '';
  @Input() public controlName: FormControlName;
  @Input() public form: FormGroup;
  @Input() public hasBorder: boolean = false;

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
}
