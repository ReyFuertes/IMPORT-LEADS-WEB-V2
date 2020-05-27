import { EditorComponent } from './components/editor/editor.component';
import { DropdownSelectSearchComponent } from './components/dropdown-select-search/dropdown-select-search.component';
import { DropdownPopoverSelectComponent } from './components/dropdown-popover-select/dropdown-popover-select.component';
import { DropdownSelectRowComponent } from './components/dropdown-select-row/dropdown-select-row.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MenuComponent } from './components/menu/menu.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { InputMaxLengthDirective } from './directives/input-maxlen.directive';
import { EllipseMenuComponent } from './components/ellipse-menu/ellipse-menu.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { ExpandablePanelComponent } from './components/expandable-panel/expandable-panel.component';
import { PopoverMenuComponent } from './components/popover-menu/popover-menu.component';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DropdownSelectComponent } from './components/dropdown-select/dropdown-select.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { UploadBoxComponent } from './components/upload-box/upload-box.component';
import { QuillEditorComponent } from './components/quill-editor/quill-editor.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { PillComponent } from './components/pill/pill.component';
import { SortComponent } from './components/sort/sort.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopNavComponent } from './components/topnav/topnav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatSelectModule, MatButtonModule, MatAutocompleteModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CircleGraphComponent } from './components/circle-graph/circle-graph.component';
import { DropdownMultiSelectComponent } from './components/dropdown-multi-select/dropdown-multi-select.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PopoverSelectComponent } from './components/popover-select/popover-select.component';
import { PopoverMultiSelectComponent } from './components/popover-multi-select/popover-multi-select.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { PrimengEditorComponent } from './components/primeng-editor/primeng-editor.component';
import { EditorModule } from 'primeng/editor';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyFormatterDirective } from './directives/currency-formatter.directive';
import { customCurrencyPipe } from './pipes/custom-currency.pipe';
import { QuillModule } from 'ngx-quill'

const materialModules = [
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
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule
];

const primeNgModules = [
  AccordionModule,
  CalendarModule,
  AutoCompleteModule,
  DropdownModule
];

const sharedComponents = [
  SidebarComponent,
  TopNavComponent,
  SortComponent,
  PillComponent,
  InputSelectComponent,
  InputComponent,
  ButtonComponent,
  TextareaComponent,
  QuillEditorComponent,
  UploadBoxComponent,
  DropdownSelectComponent,
  DropdownSelectComponent,
  DatepickerComponent,
  PopoverMenuComponent,
  ExpandablePanelComponent,
  CircleGraphComponent,
  DropdownMultiSelectComponent,
  ExpansionPanelComponent,
  EllipseMenuComponent,
  PopoverSelectComponent,
  PopoverMultiSelectComponent,
  StarRatingComponent,
  PrimengEditorComponent,
  InputSearchComponent,
  MenuComponent,
  DatatableComponent,
  DropdownSelectRowComponent,
  DropdownPopoverSelectComponent,
  DropdownSelectSearchComponent,
  EditorComponent
];

const directives = [
  NumberOnlyDirective,
  InputMaxLengthDirective,
  CurrencyFormatterDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    EditorModule,
    ...materialModules,
    ...primeNgModules,
    RouterModule,
    NgxFileDropModule,
    QuillModule.forRoot()
  ],
  exports: [...sharedComponents, ...directives],
  declarations: [...sharedComponents, ...directives, customCurrencyPipe],
  providers: [customCurrencyPipe],
})
export class SharedModule { }
