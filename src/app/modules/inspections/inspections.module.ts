import { InspectionReportCommentsComponent } from './components/inspection-report-comments/inspection-report-comments.component';
import { InspectionReportFailuresComponent } from './components/inspection-report-failures/inspection-report-failures.component';
import { InspectionReportTagsComponent } from './components/inspection-report-tags/inspection-report-tags.component';
import { InspectionReportProductsComponent } from './components/inspection-report-products/inspection-report-products.component';
import { InspectionReportNotableItemsComponent } from './components/inspection-report-notable-items/inspection-report-notable-items.component';
import { InspectorReportInspectorComponent } from './components/inspection-report-inspector/inspection-report-inspector.component';
import { InspectionReportInspectionComponent } from './components/inspection-report-inspections/inspection-report-inspections.component';
import { InspectionReportPageComponent } from './components/inspection-report-page/inspection-report-page.component';
import { DialogModule } from './../dialogs/dialog.module';
import { InspectionQualityRequirementComponent } from './components/inspection-quality-requirement/inspection-quality-requirement.component';
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
import { MatIconModule, MatTabsModule, MatButtonModule, MatListModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule, MatExpansionModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatTooltipModule, MatTableModule, MatRadioModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { InspectionActivePanelComponent } from './components/inspection-active-panel/inspection-active-panel.component';
import { InspectionFinishedPanelComponent } from './components/inspection-finished-panel/inspection-finished-panel.component';

const routes: Routes = [
  {
    path: '',
    component: InspectionsContainerComponent,
    children: [
      {
        path: '',
        component: InspectionPageComponent
      },
      {
        path: 'run-template',
        component: InspectionRunPageComponent
      },
      {
        path: 'report',
        component: InspectionReportPageComponent
      }
    ]
  }
];

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
  MatRadioModule
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
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [
    InspectionsContainerComponent,
    InspectionPageComponent,
    InspectionPanelDetailComponent,
    InspectionRunPageComponent,
    InspectionQualityRequirementComponent,
    InspectionReportPageComponent,
    InspectorReportInspectorComponent,
    InspectionReportInspectionComponent,
    InspectionReportNotableItemsComponent,
    InspectionReportProductsComponent,
    InspectionReportTagsComponent,
    InspectionReportFailuresComponent,
    InspectionReportCommentsComponent,
    InspectionActivePanelComponent,
    InspectionFinishedPanelComponent
  ],
  providers: [],
})
export class InspectionModule { }
