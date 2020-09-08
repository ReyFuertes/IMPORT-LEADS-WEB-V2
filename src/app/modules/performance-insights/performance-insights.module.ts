import { CalendarModule } from 'primeng/calendar';
import { PerformanceInsightsComponent } from './container/performance-insights-container.component';
import { DialogModule } from './../dialogs/dialog.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts';
import { PerformanceInsightsOverviewPageComponent } from './components/performance-insights-overview-page/performance-insights-overview-page.component';
import { PerformanceInsightsQuickWinsComponent } from './components/performance-insights-quick-wins/performance-insights-quick-wins.component';
import { PerformanceInsightsKpiComponent } from './components/performance-insights-kpi/performance-insights-kpi.component';
import { PerformanceInsightsVenueComponent } from './components/performance-insights-venue/performance-insights-venue.component';
import { PerformanceInsightsGraphsComponent } from './components/performance-insights-graphs/performance-insights-graphs.component';
import { PerformanceInsightsExpansionListComponent } from './components/performance-insights-expansion-list/performance-insights-expansion-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';

const routes: Routes = [
  {
    path: '',
    component: PerformanceInsightsComponent,
    children: [
      {
        path: '',
        component: PerformanceInsightsOverviewPageComponent
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
  MatRadioModule,
  MatDatepickerModule
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DialogModule,
    ChartsModule,
    CalendarModule,
    ...materialModules,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [
    PerformanceInsightsComponent,
    PerformanceInsightsOverviewPageComponent,
    PerformanceInsightsQuickWinsComponent,
    PerformanceInsightsKpiComponent,
    PerformanceInsightsVenueComponent,
    PerformanceInsightsGraphsComponent,
    PerformanceInsightsExpansionListComponent],
  providers: [],
})
export class PerformanceInsightsModule { }
