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
import { MatTableModule, MatIconModule, MatTooltipModule, MatButtonToggleModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatButtonModule, MatAutocompleteModule, MatExpansionModule, MatCardModule, MatStepperModule, MatTabsModule, MatDialogModule, MatSlideToggleModule } from '@angular/material';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { UserProfileDetailsComponent } from './components/user-profile-details/user-profile-details.component';
import { UserProfileSummaryComponent } from './components/user-profile-summary/user-profile-summary.component';
import { UserProfileInspectionComponent } from './components/user-profile-inspection/user-profile-inspection.component';
import { UserSettingPageComponent } from './components/user-setting-page/user-setting-page.component';
import { UserSettingDetailsComponent } from './components/user-setting-details/user-setting-details.component';
import { UsersService, UserProfileService } from './users.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { UserProfileEffects } from './store/effects/user-profile.effects';

const routes: Routes = [
  {
    path: '',
    component: UsersContainerComponent,
    children: [
      {
        path: '',
        component: UserOverviewPageComponent
      },
      {
        path: 'profile',
        component: UserProfilePageComponent
      },
      {
        path: 'setting',
        component: UserSettingPageComponent
      }
    ]
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
    EffectsModule.forFeature([
      UserProfileEffects
    ])
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
    UserSettingDetailsComponent
  ],
  providers: [UsersService, UserProfileService],
})
export class UsersModule { }
