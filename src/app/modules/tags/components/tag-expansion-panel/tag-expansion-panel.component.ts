import { updateTagAction, deleteTagAction } from './../../store/actions/tags.actions';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { ITag } from './../../tags.model';
import { AppState } from 'src/app/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { TagsDialogComponent } from 'src/app/modules/dialogs/components/tags/tags-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { MatDialog } from '@angular/material/dialog';
import { addTagAction } from '../../store/actions/tags.actions';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-tag-expansion-panel',
  templateUrl: './tag-expansion-panel.component.html',
  styleUrls: ['./tag-expansion-panel.component.scss']
})

export class TagExpansionPanelComponent extends GenericRowComponent implements AfterViewInit {
  @Input() public items: ITag[];

  public svgPath: string = environment.svgPath;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public selectedId: string;
  public selectedItem: ITag;

  constructor(private cdRef: ChangeDetectorRef, public translateService: TranslateService, private store: Store<AppState>, public dialog: MatDialog) {
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
  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public dragStarted(event: any): void {
    this.dragStart = event;
  }

  public onAddTag(): void {
    const dialogRef = this.dialog.open(TagsDialogComponent, { data: {} });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          const item: ITag = { tag_name: result };
          this.store.dispatch(addTagAction({ item }));
        }
      });
  }

  public onKeypress = (pnl: any): void => {
    event.preventDefault();
    pnl.close();
  }

  public onDelete = (id: string) => this.selectedId = id;

  public onEdit(item: ITag, value: string): void {
    this.selectedItem = item;

    if (value) {
      item = Object.assign({}, item, {
        tag_name: value
      });
      this.selectedItem = item;
    }
  }

  public onSave(): void {
    this.store.dispatch(updateTagAction({ item: this.selectedItem }));
    this.selectedIndex = null;
  }

  public onClickPnl(pnl: any, event: any, i: number, item: ITag): void {
    if (item)
      this.selectedItem = item;

    if (event.target.classList.contains('no-expand')) {
      pnl.close();
    }

    if (event.target.classList.contains('delete')) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '410px',
        data: {
          action: 0
        }
      });
      dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
        .subscribe(result => {
          if (result) {
            setTimeout(() => {
              this.store.dispatch(deleteTagAction({ id: this.selectedId }));
            }, 100);
          }
        });
      pnl.close();
    }

    if (event.target.classList.contains('edit')) {
      this.selectedIndex = i;
      pnl.close();
    }

    if (event.target.classList.contains('close')) {
      this.selectedIndex = null;
      pnl.close();
    }
  }
}
