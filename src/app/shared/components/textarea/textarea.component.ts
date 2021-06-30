import { FormControlName, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'il-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})

export class TextareaComponent extends GenericDestroyPageComponent implements OnInit {
  @Input() public controlName: FormControlName;
  @Input() public form: FormGroup;
  @Input() public placeholder: string;
  @Input() public rows: number = 3;
  @Input() public isFloatLabel: boolean = false;
  @Input() public noResize: boolean = false;
  @Input() public hasBorder: boolean = false;
  @Input() public value: any;

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, public translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }
}
