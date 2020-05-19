import { VenueProductsEffects } from './store/venue-product.effects';
import { VenueProductsService } from './venue-product.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VenuesService } from './venues.service';
import { VenueAddressComponent } from './components/venue-address/venue-address.component';
import { VenueProductsComponent } from './components/venue-products/venue-products.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from './../dialogs/dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { VenueExpansionListComponent } from './components/venue-expansion-list/venue-expansion-list.component';
import { VenueOverviewPageComponent } from './components/venue-overview-page/venue-overview-page.component';
import { VenuesContainerComponent } from './container/venues-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule, MatTooltipModule, MatButtonToggleModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatButtonModule, MatAutocompleteModule, MatExpansionModule, MatCardModule, MatStepperModule, MatTabsModule, MatDialogModule, MatSlideToggleModule } from '@angular/material';
import { VenuesReducer } from './store/venues.reducer';
import { VenuesEffects } from './store/venues.effects';

const routes: Routes = [
  {
    path: '',
    component: VenuesContainerComponent,
    children: [
      {
        path: '',
        component: VenueOverviewPageComponent
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
  MatSlideToggleModule
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
    StoreModule.forFeature('venues', VenuesReducer),
    EffectsModule.forFeature([VenuesEffects, VenueProductsEffects])
  ],
  exports: [],
  declarations: [
    VenuesContainerComponent,
    VenueOverviewPageComponent,
    VenueExpansionListComponent,
    VenueProductsComponent,
    VenueAddressComponent
  ],
  providers: [VenuesService, VenueProductsService],
})
export class VenuesModule { }
