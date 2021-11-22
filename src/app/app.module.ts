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
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VenuesEffects } from './modules/venues/store/venues.effects';
import { AuthModule } from './modules/auth/auth.module';
import { TokenInterceptor } from './services/http-token-interceptor';
import { AuthGuard } from './services/auth.guard';
import { InitAppEffect } from './store/effects/app.effect';
import { BlockUIModule } from 'primeng/blockui';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AccessService } from './services/api.service';
import { UserMgmtEffects } from './modules/user-management/store/user-mgmt.effects';
import { NgxEchartsModule } from 'ngx-echarts';
import { UserProfileEffects } from './modules/users/store/effects/user-profile.effects';
import { ToastModule } from 'primeng/toast';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PublicModule } from './modules/public/public.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    PublicModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([VenuesEffects, InitAppEffect, UserMgmtEffects, UserProfileEffects]),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    TranslateModule .forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AccessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
