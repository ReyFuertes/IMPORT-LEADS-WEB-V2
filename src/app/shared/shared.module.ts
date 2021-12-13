import { InputSwitchModule } from 'primeng/inputswitch';
import { InputSwitchComponent } from './components/input-switch/input-switch.component';
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
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CircleGraphComponent } from './components/circle-graph/circle-graph.component';
import { DropdownMultiSelectComponent } from './components/dropdown-multi-select/dropdown-multi-select.component';
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
import { HasRoleDirective } from './directives/user.role.directive';
import { MatPaginatorModule } from '@angular/material/paginator';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { MatRadioModule } from '@angular/material/radio';
import { SafePipe } from './pipes/html';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { DropdownMultiSelectNGComponent } from './components/dropdown-multi-select-ng/dropdown-multi-select-ng.component';
import { MultiSelectModule } from 'primeng/multiselect';

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
  MatPaginatorModule,
  MatRadioModule,
  MatCardModule
];

const primeNgModules = [
  AccordionModule,
  CalendarModule,
  AutoCompleteModule,
  DropdownModule,
  InputSwitchModule,
  MultiSelectModule
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
  EditorComponent,
  InputSwitchComponent,
  HasRoleDirective,
  RadioGroupComponent,
  PageNotFoundComponent,
  DropdownMultiSelectNGComponent
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
    QuillModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [...sharedComponents, ...directives],
  declarations: [...sharedComponents, ...directives, customCurrencyPipe],
  providers: [customCurrencyPipe, SafePipe],
})
export class SharedModule { }
