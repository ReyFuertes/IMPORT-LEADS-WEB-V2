import { TagQuestionsService } from './services/tag-questions.service';
import { TagsEffect } from './store/effects/tags.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TagsService } from './tags.service';
import { TagExpansionListComponent } from './components/tag-expansion-list/tag-expansion-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from './../dialogs/dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagOverviewPageComponent } from './components/tag-overview-page/tag-overview-page.component';
import { TagExpansionPanelComponent } from './components/tag-expansion-panel/tag-expansion-panel.component';
import { TagsContainerComponent } from './container/tags-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsReducer } from './store/reducers/tags.reducer';
import { TagQuestionsEffects } from './store/effects/tag-question.effects';

const routes: Routes = [
  {
    path: '',
    component: TagsContainerComponent,
    children: [
      {
        path: '',
        component: TagOverviewPageComponent
      }
    ]
  }
];

const primeNgModules = [
  InputSwitchModule
];

const materialModules = [
  MatIconModule,
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
  MatTooltipModule
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
    StoreModule.forFeature('tag', TagsReducer),
    EffectsModule.forFeature([TagsEffect, TagQuestionsEffects])
  ],
  exports: [],
  declarations: [
    TagsContainerComponent,
    TagExpansionPanelComponent,
    TagOverviewPageComponent,
    TagExpansionListComponent
  ],
  providers: [
    TagsService,
    TagQuestionsService
  ],
})
export class TagsModule { }
