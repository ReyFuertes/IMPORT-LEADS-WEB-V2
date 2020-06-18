import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { updateTagQuestion, addTagQuestion, deleteTagQuestion } from './../../store/actions/tag-question.action';
import { AppState } from './../../../contracts/store/reducers/index';
import { Store } from '@ngrx/store';
import { ITagQuestion } from './../../tags.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TagsQuestionDialogComponent } from 'src/app/modules/dialogs/components/tags-question/tags-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ITag } from '../../tags.model';

@Component({
  selector: 'il-tag-expansion-list',
  templateUrl: './tag-expansion-list.component.html',
  styleUrls: ['./tag-expansion-list.component.scss']
})

export class TagExpansionListComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: string[];
  @Input()
  public tag: ITag;

  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public selectedId: string;
  public selectedItem: ITagQuestion;

  @Output()
  public valueEmitter = new EventEmitter<ITagQuestion>();

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit() { }

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
    dialogRef.afterClosed().subscribe(result => {
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
    dialogRef.afterClosed().subscribe(result => {
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
