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
import { LoaderInterceptor, LoaderService } from './services/loader.interceptor';
import { BlockUIModule } from 'primeng/blockui';
import { MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { AccessService } from './services/api.service';

const materialModules = [
  MatProgressSpinnerModule,
  MatProgressBarModule
];

const primengModules = [
  BlockUIModule
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
    EffectsModule.forRoot([VenuesEffects, InitAppEffect]),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    AccessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
