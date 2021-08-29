import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'il-contract-expansion-panel',
  templateUrl: './contract-expansion-panel.component.html',
  styleUrls: ['./contract-expansion-panel.component.scss']
})

export class ContractExpansionPanelComponent extends GenericRowComponent implements AfterViewInit, OnChanges {
  public svgPath: string = environment.svgPath;
  @Input()
  public panels: Array<{ title: string, description: string }>;
  public selectedPnl: number | null;
  public dragIndex: number | null;
  public isTitleHover: number | null;
  public isTitleEditMode: boolean = false;
  public isDescEditMode: boolean = false;
  public isDescHover: number | null
  public isEventDialog: boolean = false;
  public dragStart: boolean = false;
  @Input()
  public inCheckListing: boolean = false;

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

  ngOnChanges() {
    this.inCheckListing = this.inCheckListing;
  }

  public onClose(pnl?: any): void {
    pnl.close();
    this.isTitleEditMode = false;
    this.isDescEditMode = false;
  }

  public onSelect(colToEdit: 0 | 1): void {
    event.preventDefault();
    this.isTitleEditMode = colToEdit === 0 ? true : false;
    this.isDescEditMode = colToEdit === 1 ? true : false;
  }

  public onEditMode(i: number, col: 0 | 1): void {
    event.preventDefault();
    this.selectedPnl = i;
    this.isTitleEditMode = col === 0 ? true : false;
    this.isDescEditMode = col === 1 ? true : false;
  }

  public onTitleHover(i: number): boolean {
    return this.isTitleHover === i;
  }

  public onDescHover(i: number): boolean {
    return this.isDescHover === i;
  }

  public mouseover(i: number, colIndctr: number): void {
    if (this.inCheckListing) return;
    this.dragIndex = i;
    if (colIndctr === 0)
      this.isTitleHover = i;
    else
      this.isDescHover = i;
  }

  public dragStarted(event: any) {
    this.dragStart = event;
  }

  public isChecked(i: number, event: any): boolean {
    return this.selectedPnl == i;
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.panels, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public expandPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    this.selectedPnl = i;
    const classList = event.currentTarget.classList;
    if (classList.contains('no-expand')) {
      pnl.close();
    }
  }
}
