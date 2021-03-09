import { ProductsEffect } from './store/products.effects';
import { ProductsService } from './products.service';
import { ProductListComponent } from './components/products-list/product-list.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductsContainerComponent } from './container/products-container.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from './../dialogs/dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmDialogModule } from 'primeng/confirmdialog';;
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProductsReducer } from './store/products.reducer';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastModule } from 'primeng/toast';


const routes: Routes = [
  {
    path: '',
    component: ProductsContainerComponent,
    children: [
      {
        path: '',
        component: ProductsPageComponent
      },
    ]
  }
];

const primeNgModules = [
  SidebarModule,
  InputSwitchModule,
  ConfirmDialogModule,
  OverlayPanelModule,
  ToastModule
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
  MatTableModule,
  MatSortModule
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
    StoreModule.forFeature('products', ProductsReducer),
    EffectsModule.forFeature([ProductsEffect])
  ],
  exports: [],
  declarations: [
    ProductsContainerComponent,
    ProductsPageComponent,
    ProductListComponent,
  ],
  providers: [
    ProductsService
  ],
})
export class ProductsModule { }
