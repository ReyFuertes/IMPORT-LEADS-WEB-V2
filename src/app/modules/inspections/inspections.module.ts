import { EffectsModule } from '@ngrx/effects';
import { InspectionEffect } from './store/effects/inspection.effect';
import { StoreModule } from '@ngrx/store';
import { ChecklistService } from './../contracts/services/contract-checklist.service';
import { InspectionReportCommentsComponent } from './components/inspection-report-comments/inspection-report-comments.component';
import { InspectionReportFailuresComponent } from './components/inspection-report-failures/inspection-report-failures.component';
import { InspectionReportTagsComponent } from './components/inspection-report-tags/inspection-report-tags.component';
import { InspectionReportProductsComponent } from './components/inspection-report-products/inspection-report-products.component';
import { InspectionReportNotableItemsComponent } from './components/inspection-report-notable-items/inspection-report-notable-items.component';
import { InspectorReportInspectorComponent } from './components/inspection-report-inspector/inspection-report-inspector.component';
import { InspectionReportInspectionComponent } from './components/inspection-report-inspections/inspection-report-inspections.component';
import { InspectionReportPageComponent } from './components/inspection-report-page/inspection-report-page.component';
import { DialogModule } from './../dialogs/dialog.module';
import { InspectionRunPageComponent } from './components/inspection-run-page/inspection-run-page.component';
import { InspectionPanelDetailComponent } from './components/inspection-panel-detail/inspection-panel-detail.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { InspectionPageComponent } from './components/inspection-page/inspection-page.component';
import { NgModule } from '@angular/core';
import { InspectionsContainerComponent } from './container/inspections-container.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts';
import { InspectionActivePanelComponent } from './components/inspection-active-panel/inspection-active-panel.component';
import { InspectionFinishedPanelComponent } from './components/inspection-finished-panel/inspection-finished-panel.component';
import { SavedChecklistService } from '../contracts/services/saved-checklist';
import { MatRadioModule } from '@angular/material/radio';
import { InspectionChecklistService, InspectionChecklistRunService, InspectionReportService } from './inspections.service';
import { InspectionRunResolver } from './inspection-run.resolver';
import { InspectionRunCategoryComponent } from './components/inspection-run-category/inspection-run-category.component';
import { InspectionRunCategoryRowComponent } from './components/inspection-run-category-row/inspection-run-category-row.component';
import { reducers } from './store/reducers';
import { InspectionChecklistEffect } from './store/effects/inspection-checklist.effect';
import { ChartModule } from 'primeng/chart';
import { NavigateGuard } from 'src/app/services/navigate.guard';
import { InspectionReportEffect } from './store/effects/inspection-report.effect';

const routes: Routes = [{
  path: '',
  component: InspectionsContainerComponent,
  children: [{
    path: '',
    component: InspectionPageComponent
  }, {
    path: ':id/run',
    component: InspectionRunPageComponent,
    resolve: {
      inspectionRun: InspectionRunResolver
    },
    canDeactivate: [NavigateGuard]
  }, {
    path: ':id/report',
    component: InspectionReportPageComponent
  }]
}];

const materialModules = [
  MatIconModule,
  MatTabsModule,
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatButtonModule,
  MatExpansionModule,
  DragDropModule,
  MatCardModule,
  MatMenuModule,
  MatTabsModule,
  MatButtonModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatTableModule,
  MatRadioModule,
  ChartModule
];
const primeNgModules = [];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DialogModule,
    ChartsModule,
    ...materialModules,
    ...primeNgModules,
    RouterModule.forChild(routes),
    StoreModule.forFeature('inspectionModule', reducers),
    EffectsModule.forFeature([
      InspectionEffect,
      InspectionChecklistEffect,
      InspectionReportEffect
    ])
  ],
  exports: [],
  declarations: [
    InspectionsContainerComponent,
    InspectionPageComponent,
    InspectionPanelDetailComponent,
    InspectionRunPageComponent,
    InspectionReportPageComponent,
    InspectorReportInspectorComponent,
    InspectionReportInspectionComponent,
    InspectionReportNotableItemsComponent,
    InspectionReportProductsComponent,
    InspectionReportTagsComponent,
    InspectionReportFailuresComponent,
    InspectionReportCommentsComponent,
    InspectionActivePanelComponent,
    InspectionFinishedPanelComponent,
    InspectionRunCategoryComponent,
    InspectionRunCategoryRowComponent
  ],
  providers: [
    ChecklistService,
    SavedChecklistService,
    InspectionChecklistRunService,
    InspectionChecklistService,
    InspectionRunResolver,
    NavigateGuard,
    InspectionReportService
  ],
})
export class InspectionModule { }
