import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogModule } from '../dialogs/dialog.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule, MatIconModule, MatTooltipModule, MatButtonToggleModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatButtonModule, MatAutocompleteModule, MatExpansionModule, MatCardModule, MatStepperModule, MatTabsModule, MatDialogModule, MatSlideToggleModule, MatPaginatorModule } from '@angular/material';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UserManagementContainerComponent } from './container/user-management-container.component';
import { UserManagementService } from './user-management.service';
import { UserManagementPageComponent } from './components/user-management-page/user-management-page.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserMgmtReducer } from './store/user-mgmt.reducer';
import { UserMgmtEffects } from './store/user-mgmt.effects';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementContainerComponent,
    children: [{
      path: '',
      component: UserManagementPageComponent
    }, {
      path: ':id/detail',
      component: UserDetailComponent
    }]
  }
];

const primeNgModules = [
  InputSwitchModule
];

const materialModules = [
  MatIconModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
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
  MatTableModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [
    UserManagementContainerComponent,
    UserManagementPageComponent,
    UserTableComponent,
    UserDetailComponent
  ],
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
    StoreModule.forFeature('userMgmt', UserMgmtReducer),
    EffectsModule.forFeature([UserMgmtEffects])
  ],
  exports: [],
  providers: [UserManagementService],
})
export class UserManagementModule { }