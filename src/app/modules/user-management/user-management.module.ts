import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogModule } from '../dialogs/dialog.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UserManagementContainerComponent } from './container/user-management-container.component';
import { UserManagementPageComponent } from './components/user-management-page/user-management-page.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserMgmtReducer } from './store/user-mgmt.reducer';
import { UserMgmtEffects } from './store/user-mgmt.effects';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { RolesService, UserAccessService, UserRolesService } from './user-mgmt.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';

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
  InputSwitchModule,
  MultiSelectModule
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
    EffectsModule.forFeature([UserMgmtEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [],
  providers: [UserAccessService, RolesService, UserRolesService],
})
export class UserManagementModule { }