import { addContractTerm, deleteContractTerm, updateContractTerm } from './../../store/actions/contract-term.actions';
import { loadContractCategoryAction, selTermsForChecklistAction } from './../../store/actions/contract-category.action';
import { MatTableDataSource } from '@angular/material/table';
import { IContractTerm, IContractCategoryTerm, IContractChecklistItem, IContractProduct, IContractTermProduct } from './../../contract.model';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { getTagsSelector } from '../../../tags/store/selectors/tags.selector';
import { AppState } from '../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { ITag } from '../../../tags/tags.model';
import { Observable } from 'rxjs';
import { ContractCategoryTermDialogComponent } from '../../../dialogs/components/contract-category-term/contract-category-term-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISimpleItem } from '../../../../shared/generics/generic.model';
import { environment } from '../../../../../environments/environment';
import { trigger, transition, style, state, animate } from '@angular/animations';
import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { map, take, tap, takeUntil, debounceTime } from 'rxjs/operators';
import { IContractCategory } from '../../contract.model';
import { deleteContractCategoryAction } from '../../store/actions/contract-category.action';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { getSelectedTermsSelector, getchecklistProductsSelector, getChecklistSelector } from '../../store/selectors/contract-checklist.selector';
import { appNotification } from 'src/app/store/actions/notification.action';
import { addItemToChecklistTermsAction } from '../../store/actions/contract-checklist.action';

@Component({
  selector: 'il-contract-category-table',
  templateUrl: './contract-category-table.component.html',
  styleUrls: ['./contract-category-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ContractCategoryTableComponent extends GenericRowComponent implements OnInit, OnChanges, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public dataSource: MatTableDataSource<IContractTerm[]>;
  public columnsToDisplay = ['term_name', 'term_description', 'action_col'];
  public expandedElement: IContractTerm | null;
  public selectedCol: string;
  public actionState: boolean = false;
  public items: ISimpleItem[];
  public form: FormGroup;
  public tagForm: FormGroup;
  public isEditName: boolean = false;
  public $tags: Observable<ISimpleItem[]>;
  public selectedTerm: IContractTerm;
  public formTag: FormGroup;
  public onPreview: boolean = false;
  public selectedRow: any;
  public categoryTerm: IContractCategoryTerm;
  public checklistTerms: IContractTermProduct[];
  public checkListProducts: IContractProduct[];

  @Input() public inCheckListing: boolean = false;
  @Input() public contract_category: IContractCategory;
  @Output() public categoryTermEmitter = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private dialog: MatDialog, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: [null],
      term_name: [null],
      term_description: [null],
      contact_category: [null],
    });

    this.store.pipe(select(getChecklistSelector)).pipe(
      takeUntil(this.$unsubscribe),
      tap(res => {
        this.checkListProducts = res.checklistProducts || [];
        this.checklistTerms = res.checklistTerms || [];
      })).subscribe();
  }

  public isTermChecked(item: string): boolean {
    return this.checklistTerms
      && this.checklistTerms.filter(ct => {
        return ct.term_id === item;
      }).shift()
      ? true : false;
  }

  public get isDisabled(): boolean {
    return this.checkListProducts && this.checkListProducts.length === 0;
  }

  public onToggleTerms(term: IContractTerm, checked: boolean): void {
    if (this.checkListProducts && this.checkListProducts.length === 0) {
      this.store.dispatch(appNotification({
        notification: { error: true, message: 'You cant need to selecting a product' }
      }));
      return;
    };

    this.categoryTermEmitter.emit({
      term_id: term.id,
      category_id: this.contract_category.id,
      checked
    });
  }

  public mouseOver = (event: any, col: string) => this.selectedRow = `${event.id}${col}`;

  public mouseOut = () => this.selectedRow = null;

  public onTagUpdate(event: any, element: IContractTerm): void {
    if (event) {
      this.store.dispatch(updateContractTerm({
        payload: {
          ...{
            id: element.id,
            term_name: element.term_name,
            term_description: element.term_description
          }, contract_tag: { id: event }
        }
      }));
    };
  }

  public onEdit(element: any, col: string): void {
    this.selectedRow = null;
    this.selectedCol = `${element.id}${col}`;

    /* patch value during expand to prepare for editing */
    this.form.patchValue(element);
  }

  ngOnInit() {
    this.$tags = this.store.pipe(select(getTagsSelector),
      map((tags: ITag[]) => tags.map(ret => {
        return {
          label: ret.tag_name,
          value: ret.id
        }
      })));
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.contract_category.terms);
  }

  public getColUuid = (element: any, col: string) => `${element.id}${col}`;

  public getTerm = (term: IContractTerm) => this.selectedTerm = term;

  public onDeleteTerm(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteContractTerm({ id }));
        /* this is a bad solution, but due to time development i just needs this */
        this.reloadContractCategory();
      }
    });
  }

  public onDelete = (id: string): void => {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: {
        action: 0
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteContractCategoryAction({ id }));
      }
    });
  }

  private reloadContractCategory = () =>
    setTimeout(() => {
      this.store.dispatch(loadContractCategoryAction({ id: this.contract_category.contract.id }))
    }, 100);

  public createTerm(): void {
    const dialogRef = this.dialog.open(ContractCategoryTermDialogComponent, {
      height: '180px'
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe((result: IContractTerm) => {
        if (result) {
          const payload = {
            ...result,
            contract_category: { id: this.contract_category.id }
          }
          this.store.dispatch(addContractTerm({ payload }));
          /* this is a bad solution, but due to time development i just needs this */
          this.reloadContractCategory();
        }
      });
  }

  public onSave(e: any): void {
    e.stopImmediatePropagation();

    if (this.form.value) {
      this.store.dispatch(updateContractTerm({ payload: this.form.value }));
    }

    setTimeout(() => {
      this.selectedRow = null;
      this.selectedCol = null;
    }, 1000);
  }

  public removeEmptyChar(str: string): string {
    return str && str.replace(/ /g, '');
  }

  public getDefaultTerm(str: string, prop: string, collapsed: boolean): string {
    return (str && this.removeEmptyChar(str) === '') || str === undefined
      ? `Write ${prop.replace(/_/g, ' ')} here...`
      : (!collapsed ? str : str.split('</p>')[0].replace(/(<([^>]+)>)/ig, '').substring(0, 100).concat('...'));
  }

  public onExpand(event: any, col: string): void {
    this.expandedElement = (this.expandedElement === event) ? null : event;
    this.selectedCol = `${event.id}${col}`;
    this.onPreview = false;

    /* patch value during expand to prepare for editing */
    this.form.patchValue(event);
  }

  public getKey(element: any): string {
    return Object.keys(element)[0];
  }

  public isHidden(element: IContractTerm): boolean {
    return element && element.term_description == this.selectedCol
      || element && element.term_name == this.selectedCol;
  }

  public onClose(): void {
    this.expandedElement = null;
    this.selectedCol = null;
    this.onPreview = false;
  }

  public getToolTipMsg(property: string) {
    const tooltip = property ? property.replace(/_/g, ' ') : property;
    return tooltip;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.inCheckListing) {
      this.inCheckListing = changes.inCheckListing.currentValue;

      if (!this.inCheckListing) {
      }
    }

    if (changes && changes.contract_category && changes.contract_category.currentValue)
      this.dataSource = new MatTableDataSource<any>(changes.contract_category.currentValue.terms);
  }
}
