import { ContractCategoryTermDialogComponent } from './components/contract-category-term/contract-category-term-dialog.component';
import { ProductAddDialogComponent } from './components/products-add/products-add-dialog.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { InspectionRunCommentDialogComponent } from './components/inspection-run-comment/inspection-run-comment-dialog.component';
import { ContractCategoryTitleDialogComponent } from './components/contract-category-title/contract-category-title-dialog.component';
import { ContractCategoryDialogComponent } from './components/contract-category/contract-category-dialog.component';
import { InspectionCommentDialogComponent } from './components/inspection-comments/inspection-comments-dialog.component';
import { BriefDialogComponent } from './components/brief/brief-dialog.component';
import { AQLDialogComponent } from './components/aql/aql-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContractAddDialogComponent } from './components/contracts-add/contract-add-dialog.component';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule, MatListModule, MatCheckboxModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { VenuesAddDialogComponent } from './components/venues-add/venues-add-dialog.component';
import { UserAddDialogComponent } from './components/users/user-add-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContractTemplateDialogComponent } from './components/contract-template/contract-template-dialog.component';
import { ContractSelectDialogComponent } from './components/contract-select/contract-select-dialog.component';
import { TagsDialogComponent } from './components/tags/tags-dialog.component';
import { TagsQuestionDialogComponent } from './components/tags-question/tags-question-dialog.component';
import { ChatUserDialogComponent } from './components/chat-user/chat-user-dialog.component';
import { ChatDetailDialogComponent } from './components/chat-detail/chat-detail-dialog.component';
import { MatDividerModule } from '@angular/material/divider';

const dialogComponents = [
  ContractAddDialogComponent,
  AQLDialogComponent,
  BriefDialogComponent,
  InspectionCommentDialogComponent,
  VenuesAddDialogComponent,
  UserAddDialogComponent,
  ContractCategoryDialogComponent,
  ContractCategoryTitleDialogComponent,
  InspectionRunCommentDialogComponent,
  ContractTemplateDialogComponent,
  ContractSelectDialogComponent,
  TagsDialogComponent,
  TagsQuestionDialogComponent,
  ChatUserDialogComponent,
  ChatDetailDialogComponent,
  ConfirmationComponent,
  ProductAddDialogComponent,
  ContractCategoryTermDialogComponent
];

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatCheckboxModule,
  DragDropModule,
  MatDividerModule,
  ScrollingModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    SharedModule,
    FlexLayoutModule
  ],
  exports: [...dialogComponents],
  declarations: [...dialogComponents],
  entryComponents: [...dialogComponents],
  providers: [],
})
export class DialogModule { }
