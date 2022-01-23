import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmChangePasswordComponent } from './components/confirm-change-password/confirm-change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PublicContainerComponent } from './container/public-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PublicReducer } from './store/public.reducer';
import { PublicEffect } from './store/public.effects';

const primengModules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  CheckboxModule,
];

const materialModules = [
  MatCardModule,
  MatButtonModule
];

const routes: Routes = [
  {
    path: 'confirm-change-password/:id',
    component: PublicContainerComponent,
    children: [{ path: '', component: ConfirmChangePasswordComponent }]
  }
];

@NgModule({
  declarations: [
    PublicContainerComponent,
    ConfirmChangePasswordComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    ...primengModules,
    ...materialModules,
    RouterModule.forChild(routes),
    StoreModule.forFeature('public', PublicReducer),
    EffectsModule.forFeature([PublicEffect]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    PublicContainerComponent,
    ConfirmChangePasswordComponent
  ],
  providers: [],
})
export class PublicModule { }