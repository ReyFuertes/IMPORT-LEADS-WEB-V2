import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ISimpleItem } from '../../generics/generic.model';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';

@Component({
  selector: 'il-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public menu: {
    label: string, children?: Array<{
      label: string, access_route?: string
    }>, access_route?: string
  };
  constructor(private cdRef: ChangeDetectorRef, private store: Store<AppState>, public translateService: TranslateService) {
    super();
  }

  public trim(value: string): string {
    return value?.trim();
  }

  ngOnInit() {
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if(language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public hasChildren(menu: ISimpleItem): boolean {
    return this.menu && this.menu.children.length > 0;
  }
}
