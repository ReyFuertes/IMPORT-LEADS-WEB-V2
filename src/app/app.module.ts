import { reducers } from './store/app.reducer';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VenuesEffects } from './modules/venues/store/venues.effects';
import { AuthModule } from './modules/auth/auth.module';
import { TokenInterceptor } from './services/http-token-interceptor';
import { AuthGuard } from './services/auth.guard';
import { AuthEffect } from './modules/auth/store/auth.effect';
import { InitAppEffect } from './store/effects/app.effect';
import { LoaderService } from './services/loader.interceptor';
import { BlockUIModule } from 'primeng/blockui';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AccessService } from './services/api.service';
import { UserMgmtEffects } from './modules/user-management/store/user-mgmt.effects';
import { NgxEchartsModule } from 'ngx-echarts';
import { UserProfileEffects } from './modules/users/store/effects/user-profile.effects';
import { ToastModule } from 'primeng/toast';

const materialModules = [
  MatProgressSpinnerModule,
  MatProgressBarModule
];

const primengModules = [
  BlockUIModule,
  ToastModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    ...materialModules,
    ...primengModules,
    SharedModule,
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([VenuesEffects, InitAppEffect, UserMgmtEffects, UserProfileEffects]),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    LoaderService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoaderInterceptor,
    //   multi: true
    // },
    AccessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
