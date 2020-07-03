import { InspectionEffect } from './../inspections/store/inspection.effect';
import { ChecklistService } from './services/contract-checklist.service';
import { ContractTermEffect } from './store/effects/contract-term.effects';
import { ContractTermService } from './services/contract-term.service';
import { CategoryEffect } from './store/effects/category.effects';
import { TagsEffect } from './../tags/store/effects/tags.effects';
import { ContractCategoryEffect } from './store/effects/contract-category.effects';
import { ContractCategoryService } from './services/contract-category.service';
import { ProductsEffect } from './../products/store/products.effects';
import { ContractProductsEffect } from './store/effects/contract-products.effects';
import { ContractProductService } from './services/contract-products.service';
import { ImageService } from './../../services/images.service';
import { UploadService } from './../../services/upload.service';
import { ContractsEffect } from './store/effects/contracts.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContractsService } from './services/contracts.service';
import { ContractCategoryComponent } from './components/contract-category/contract-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractRightContentComponent } from './components/contract-right-content/contract-right-content.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContractExpansionPanelComponent } from './components/contract-expansion-panel/contract-expansion-panel.component';
import { DialogModule } from './../dialogs/dialog.module';
import { ContractDetailProductsComponent } from './components/contract-detail-products/contract-detail-products.component';
import { ContractOverviewPageComponent } from './components/contract-overview-page/contract-overview-page.component';
import { ContractDetailPageComponent } from './components/contract-detail-page/contract-detail-page.component';
import { ContractCardMilestoneComponent } from './components/contract-card-milestone/contract-card-milestone.component';
import { ContractCardComponent } from './components/contract-card/contract-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContractsContainerComponent } from './container/contracts-container.component';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCheckboxModule, MatCardModule, MatMenuModule, MatStepperModule, MatTabsModule, MatButtonModule, MatDialogModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatSelectModule, MatAutocompleteModule, MatExpansionModule, MatSlideToggleModule,
  MatTableModule
} from '@angular/material';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ContractCategoryTitleComponent } from './components/contract-category-title/contract-category-title.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { reducers } from './store/reducers';
import { ContractCategoryTableComponent } from './components/contract-category-table/contract-category-table.component';
import { ChecklistEffect } from './store/effects/contract-checklist.effect';

const routes: Routes = [
  {
    path: '',
    component: ContractsContainerComponent,
    children: [
      {
        path: '',
        component: ContractOverviewPageComponent
      },
      {
        path: ':id/detail',
        component: ContractDetailPageComponent
      }
    ]
  }
];

const primeNgModules = [
  SidebarModule,
  InputSwitchModule,
  ConfirmDialogModule,
  OverlayPanelModule
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
  DragDropModule,
  MatCardModule,
  MatMenuModule,
  MatStepperModule,
  MatTabsModule,
  MatButtonModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatTooltipModule,
  ScrollingModule,
  MatTableModule
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...primeNgModules,
    ...materialModules,
    DialogModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('contractsModule', reducers),
    EffectsModule.forFeature([
      ContractsEffect,
      ContractProductsEffect,
      ProductsEffect,
      ContractCategoryEffect,
      TagsEffect,
      CategoryEffect,
      ContractTermEffect,
      ChecklistEffect,
      InspectionEffect
    ])
  ],
  exports: [],
  declarations: [
    ContractsContainerComponent,
    ContractCardComponent,
    ContractCardMilestoneComponent,
    ContractDetailPageComponent,
    ContractOverviewPageComponent,
    ContractDetailProductsComponent,
    ContractExpansionPanelComponent,
    ContractRightContentComponent,
    ContractCategoryComponent,
    ContractCategoryTitleComponent,
    ContractCategoryTableComponent
  ],
  providers: [
    ConfirmationService,
    ContractsService,
    UploadService,
    ImageService,
    ContractProductService,
    ContractCategoryService,
    ContractTermService,
    ChecklistService
  ],
})
export class ContractsModule { }
