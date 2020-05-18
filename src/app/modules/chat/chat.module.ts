
import { InputSwitchModule } from 'primeng/inputswitch';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from './../dialogs/dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ChatContainerComponent } from './container/chat-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule, MatTooltipModule, MatButtonToggleModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatButtonModule, MatAutocompleteModule, MatExpansionModule, MatCardModule, MatStepperModule, MatTabsModule, MatDialogModule, MatSlideToggleModule } from '@angular/material';
import { ChatOverviewPageComponent } from './components/chat-overview-page/chat-overview-page.component';
import { ChatUserListComponent } from './components/chat-user-list/chat-user-list.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatMessageContainerComponent } from './components/chat-message-container/chat-message-container.component';

const routes: Routes = [
  {
    path: '',
    component: ChatContainerComponent,
    children: [
      {
        path: '',
        component: ChatOverviewPageComponent
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
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [
    ChatContainerComponent,
    ChatOverviewPageComponent,
    ChatUserListComponent,
    ChatBoxComponent,
    ChatMessageComponent,
    ChatMessageContainerComponent,
  ],
  providers: [],
})
export class ChatModule { }
