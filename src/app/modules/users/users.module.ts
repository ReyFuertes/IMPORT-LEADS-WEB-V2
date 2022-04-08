import { UsersContainerComponent } from './container/users-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from './../dialogs/dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { UserOverviewPageComponent } from './components/user-overview-page/user-overview-page.component';
import { UserExpansionPanelComponent } from './components/user-expansion-panel/user-expansion-panel.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
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
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { UserProfileDetailsComponent } from './components/user-profile-details/user-profile-details.component';
import { UserProfileSummaryComponent } from './components/user-profile-summary/user-profile-summary.component';
import { UserProfileInspectionComponent } from './components/user-profile-inspection/user-profile-inspection.component';
import { UserSettingPageComponent } from './components/user-setting-page/user-setting-page.component';
import { UserSettingDetailsComponent } from './components/user-setting-details/user-setting-details.component';
import { UserProfileService, UserService } from './users.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { UserProfileEffects } from './store/effects/user-profile.effects';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { UserEffects } from './store/effects/user.effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { TabViewModule } from 'primeng/tabview';
import { UserSettingCategoryTemplateComponent } from './components/user-category-template/user-category-template.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserSettingEffects } from './store/effects/user-setting.effects';
import { UserSettingCategoryComponent } from './components/user-setting-category/user-setting-category.component';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [{
  path: '',
  component: UsersContainerComponent,
  children: [{
    path: '',
    component: UserOverviewPageComponent
  }, {
    path: 'profile',
    component: UserProfilePageComponent
  }, {
    path: 'setting',
    component: UserSettingPageComponent
  }, {
    path: 'change-password',
    component: UserChangePasswordComponent
  }]
}];

const primeNgModules = [
  InputSwitchModule,
  TabViewModule,
  TableModule,
  ButtonModule,
  MatTooltipModule,
  DropdownModule
];

const materialModules = [
  MatIconModule,
  MatTooltipModule,
  MatButtonToggleModule,
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
    StoreModule.forFeature('usersModule', reducers),
    EffectsModule.forFeature([UserProfileEffects, UserEffects, UserSettingEffects,]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [],
  declarations: [
    UsersContainerComponent,
    UserOverviewPageComponent,
    UserExpansionPanelComponent,
    UserProfilePageComponent,
    UserProfileDetailsComponent,
    UserProfileSummaryComponent,
    UserProfileInspectionComponent,
    UserSettingPageComponent,
    UserSettingDetailsComponent,
    UserChangePasswordComponent,
    UserSettingCategoryTemplateComponent,
    UserSettingCategoryComponent
  ],
  providers: [UserProfileService, UserService],
})
export class UsersModule { }
