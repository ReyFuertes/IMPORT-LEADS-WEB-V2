import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPermissionContainerComponent } from './container/view-permission-container.component';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ViewPermissionPageComponent } from './components/view-permission-page/view-permission-page.component';
import { ViewPermissionTableComponent } from './components/view-permission-table/view-permission-table.component';

const primeNgModules = [];

const materialModules = [];

const routes: Routes = [
  {
    path: '',
    component: ViewPermissionContainerComponent,
    children: []
  }
];

@NgModule({
  declarations: [
    ViewPermissionContainerComponent,
    ViewPermissionPageComponent,
    ViewPermissionTableComponent
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
    StoreModule.forFeature('userView', {}),
    EffectsModule.forFeature([])
  ],
  exports: [],
  providers: [],
})
export class ViewPermissionModule { }