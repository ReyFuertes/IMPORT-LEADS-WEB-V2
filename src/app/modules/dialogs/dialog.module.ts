import { ContractCategoryTermDialogComponent } from './components/contract-category-term/contract-category-term-dialog.component';
import { ProductAddDialogComponent } from './components/products-add/products-add-dialog.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { InspectionRunCommentDialogComponent } from './components/inspection-run-comment/inspection-run-comment-dialog.component';
import { ContractCategoryTitleDialogComponent } from './components/contract-category-title/contract-category-title-dialog.component';
import { ContractCategoryDialogComponent } from './components/contract-category/contract-category-dialog.component';
import { InspectionCommentDialogComponent } from './components/inspection-comment/inspection-comment-dialog.component';
import { BriefDialogComponent } from './components/brief/brief-dialog.component';
import { AQLDialogComponent } from './components/aql/aql-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContractAddDialogComponent } from './components/contract-add-dialog/contract-add-dialog.component';
import { NgModule } from '@angular/core';
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
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PauseOrRunDialogComponent } from './components/pause-run/pause-run.component';
import { ContractCategoryImportDialogComponent } from './components/contract-category-import/contract-category-import.component';
import { TableModule } from 'primeng/table';
import { ContractImportTemplateDialogComponent } from './components/contract-import-template-dialog/contract-import-template-dialog.component';
import { CategoryTemplateDialogComponent } from './components/category-template/category-template-dialog.component';
import { RunExistErrorDialogComponent } from './components/run-exist-error/run-exist-error.component';
import { ImageViewerDialogComponent } from './components/image-viewer-dialog/image-viewer-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CheckboxModule } from 'primeng/checkbox';

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
  ContractCategoryTermDialogComponent,
  PauseOrRunDialogComponent,
  ContractImportTemplateDialogComponent,
  ContractCategoryImportDialogComponent,
  CategoryTemplateDialogComponent,
  RunExistErrorDialogComponent,
  ImageViewerDialogComponent
];

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatCheckboxModule,
  DragDropModule,
  MatDividerModule,
  ScrollingModule,
  TableModule,
  MatBadgeModule
];

const primeNgModules = [
  CheckboxModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ...primeNgModules,
    SharedModule,
    FlexLayoutModule
  ],
  exports: [...dialogComponents],
  declarations: [...dialogComponents],
  entryComponents: [...dialogComponents],
  providers: [],
})
export class DialogModule { }
