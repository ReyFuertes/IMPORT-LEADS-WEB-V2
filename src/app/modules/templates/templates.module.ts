import { DragDropModule } from '@angular/cdk/drag-drop';
import { TemplateExpansionPanelComponent } from './components/template-expansion-panel/template-expansion-panel.component';
import { TemplateCardComponent } from './components/template-card/template-card.component';
import { MatTabsModule, MatButtonModule, MatListModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule, MatExpansionModule, MatCardModule, MatDialogModule, MatSlideToggleModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TemplatePageComponent } from './components/template-page/template-page.component';
import { TemplatesContainerComponent } from './container/template-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from './../dialogs/dialog.module';

const routes: Routes = [
  {
    path: '',
    component: TemplatesContainerComponent,
    children: [
      {
        path: '',
        component: TemplatePageComponent
      }
    ]
  }
];
const materialModules = [
  MatTabsModule,
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatButtonModule,
  MatExpansionModule,
  DragDropModule,
  MatCardModule,
  MatMenuModule,
  MatTabsModule,
  MatButtonModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatTooltipModule
];
const primeNgModules = [
  BlockUIModule,
  PanelModule
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DialogModule,
    ...materialModules,
    ...primeNgModules,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [
    TemplatesContainerComponent,
    TemplatePageComponent,
    TemplateCardComponent,
    TemplateExpansionPanelComponent
  ],
  providers: [],
})
export class TemplatesModule { }
