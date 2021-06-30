import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { updateTagQuestion, addTagQuestion, deleteTagQuestion } from './../../store/actions/tag-question.action';
import { AppState } from './../../../contracts/store/reducers/index';
import { select, Store } from '@ngrx/store';
import { ITagQuestion } from './../../tags.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TagsQuestionDialogComponent } from 'src/app/modules/dialogs/components/tags-question/tags-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ITag } from '../../tags.model';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-tag-expansion-list',
  templateUrl: './tag-expansion-list.component.html',
  styleUrls: ['./tag-expansion-list.component.scss']
})

export class TagExpansionListComponent extends GenericDestroyPageComponent implements OnInit {
  @Input() public items: string[];
  @Input() public tag: ITag;
  @Output() public valueEmitter = new EventEmitter<ITagQuestion>();

  public svgPath: string = environment.svgPath;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public selectedId: string;
  public selectedItem: ITagQuestion;


  constructor(public cdRef: ChangeDetectorRef, public translateService: TranslateService, private store: Store<AppState>, public dialog: MatDialog) {
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

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public mouseover(i: number, colIndctr?: number) {
    if (this.selectedIndex == null)
      this.hoveredIndex = i;
  }

  public mouseout(): void {
    if (this.selectedIndex != null) return;

    this.hoveredIndex = null;
    this.selectedIndex = null;
  }

  public onDelete(id: string): void {
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
            this.store.dispatch(deleteTagQuestion({ id }));
          }, 200);
        }
      });
  }

  public dragStarted(event: any): void {
    this.dragStart = event;
  }

  public onSave(): void {
    if (this.selectedItem) {
      this.store.dispatch(updateTagQuestion({ item: this.selectedItem }));
    }
    this.onClose();
  }

  public onEdit(item: ITagQuestion, value: string): void {
    this.selectedItem = item;
    if (value)
      item.question_name = value;
  }

  public onClose(): void {
    setTimeout(() => {
      this.selectedIndex = null;
    }, 100);
  }

  public onAddQuestion(event: any): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(TagsQuestionDialogComponent, { data: {} });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          const item = {
            question_name: result,
            tag: { id: this.tag.id }
          }
          this.store.dispatch(addTagQuestion({ item }));
        }
      });
  }
}
