import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';

@Component({
  selector: 'il-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent extends GenericDestroyPageComponent implements AfterViewInit {
  @Input()
  public placeholder: string = '';
  @Input()
  public controlName: FormControlName;
  @Input()
  public form: FormGroup;
  @Input()
  public isDisabled: boolean = true;
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

  public onKeypress(): any {
    return false;
  }
}
