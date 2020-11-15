import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportContainerComponent } from './container/report-container.component';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogModule } from '../dialogs/dialog.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ContractDetailReportComponent } from './components/contract-detail-report/contract-detail-report.component';
import { ContractsEffect } from '../contracts/store/effects/contracts.effects';
import { reducers } from '../../modules/contracts/store/reducers';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ContractProductsEffect } from '../contracts/store/effects/contract-products.effects';
import { SafePipe } from 'src/app/shared/pipes/html';
import { ContractCategoryEffect } from '../contracts/store/effects/contract-category.effects';

const primeNgModules = [
  SidebarModule,
  InputSwitchModule,
  ConfirmDialogModule,
];

const materialModules = [
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatBadgeModule,
  MatMenuModule,
  MatSelectModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatCardModule,
  MatMenuModule,
  MatStepperModule,
  MatTabsModule,
  MatButtonModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatTableModule
];

const routes: Routes = [
  {
    path: '',
    component: ReportContainerComponent,
    children: [{
      path: ':id/agreement',
      component: ContractDetailReportComponent,
    }]
  }
];

@NgModule({
  declarations: [
    ReportContainerComponent,
    ContractDetailReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...primeNgModules,
    ...materialModules,
    RouterModule.forChild(routes),
    StoreModule.forFeature('contractsModule', reducers),
    EffectsModule.forFeature([
      ContractsEffect,
      ContractProductsEffect,
      ContractCategoryEffect
    ])
  ],
  exports: [],
  providers: [SafePipe],
})
export class ReportModule { }