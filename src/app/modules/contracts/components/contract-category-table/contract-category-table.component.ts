import { addContractTerm, deleteContractTerm, updateContractTerm, saveTermImage } from './../../store/actions/contract-term.actions';
import { loadContractCategory, updateContractCategorySuccess, updateContractCategory } from './../../store/actions/contract-category.action';
import { MatTableDataSource } from '@angular/material/table';
import { IContractTerm } from './../../contract.model';
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
import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { IContractCategory } from '../../contract.model';
import { deleteContractCategory } from '../../store/actions/contract-category.action';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';


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
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;

  @Input()
  public isRightNavOpen: boolean = false;
  @Input()
  public contract_category: IContractCategory;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: [null],
      term_name: [null],
      term_description: [null],
      contact_category: [null],
      images: [null]
    })
  }

  public onTagUpdate(event: any, id: string): void {
    if (event) {
      const tag = { id: event };
      this.store.dispatch(updateContractTerm({
        payload: { id, contract_tag: tag }
      }));
    };
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

  public getTerm = (term: IContractTerm) => this.selectedTerm = term;

  public onDeleteTerm(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: {}
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
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteContractCategory({ id }));
      }
    });
  }

  private reloadContractCategory = () =>
    setTimeout(() => {
      this.store.dispatch(loadContractCategory({ id: this.contract_category.contract.id }))
    }, 1000);

  public createTerm(): void {
    const dialogRef = this.dialog.open(ContractCategoryTermDialogComponent, {
      height: '270px'
    });
    dialogRef.afterClosed().subscribe((result: IContractTerm) => {
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

  public onSave(): void {
    if (this.form.value) {
        this.store.dispatch(updateContractTerm({ payload: this.form.value }));

        this.store.dispatch(saveTermImage(this.form.get('images').value));
    }

    this.onClose();
    /* this is a bad solution, but due to time development i just needs this */
    this.reloadContractCategory();
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

    /* patch value during expand to prepare for editing */
    this.form.patchValue(event);
  }

  public isHidden(element: IContractTerm): boolean {
    return element && element.term_description == this.selectedCol
      || element && element.term_name == this.selectedCol;
  }

  public onClose(): void {
    this.expandedElement = null;
    this.selectedCol = null;
  }

  public getToolTipMsg(property: string) {
    const tooltip = property ? property.replace(/_/g, ' ') : property;
    return tooltip;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.isRightNavOpen)
      this.isRightNavOpen = changes.isRightNavOpen.currentValue;

    if (changes && changes.contract_category)
      this.dataSource = new MatTableDataSource<any>(changes.contract_category.currentValue.terms);
  }
}
