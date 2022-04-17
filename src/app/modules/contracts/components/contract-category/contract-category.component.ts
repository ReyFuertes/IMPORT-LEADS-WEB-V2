import { IContractCategoryTerm } from './../../contract.model';
import { loadContractCategoryAction } from '../../store/actions/contract-category.action';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ICategory } from '../../contract.model';
import { ContractCategoryDialogComponent } from '../../../dialogs/components/contract-category/contract-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { IContractCategory } from '../../contract.model';
import { updateCategoryAction } from '../../store/actions/category.action';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { CategoryTemplateDialogComponent } from 'src/app/modules/dialogs/components/category-template/category-template-dialog.component';
import { saveCategoryTemplateAction } from '../../store/actions/Category-template.action';
import { TranslateService } from '@ngx-translate/core';
import { saveContractCategoryTemplateAction } from '../../store/actions/contract-category-template.action';

@Component({
  selector: 'il-contract-category',
  templateUrl: './contract-category.component.html',
  styleUrls: ['./contract-category.component.scss'],
  providers: [ConfirmationService]
})

export class ContractCategoryComponent extends GenericRowComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public panels: Array<{ id: number, title: string, description: string }> = [];
  public tabTitle: string;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public showToggle: boolean = false;

  @Input() public contractCategory: IContractCategory;
  @Input() public inCheckListing: boolean = false;
  @Output() public removeProductSpecEmitter = new EventEmitter<number>();
  @Output() public categoryTermEmitter = new EventEmitter<IContractCategoryTerm>();

  constructor(public translateService: TranslateService, private store: Store<AppState>, public dialog: MatDialog) {
    super();
  }

  public ngOnInit() { }

  public onToggleTerm(event: IContractCategoryTerm): void {
    this.categoryTermEmitter.emit(event);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.contract_category && changes.contract_category.currentValue) {
      this.contractCategory = changes.contract_category.currentValue;
    }
    this.inCheckListing = changes.inCheckListing.currentValue;
  }

  public saveCategoryAsTemplate(category: any): void {
    const dialogRef = this.dialog.open(CategoryTemplateDialogComponent, {
      data: { category }
    });
    dialogRef.afterClosed().subscribe(template => {
      if (template) {
        const payload = {
          title: template.title,
          description: template.description,
          contract: { id: this.contractCategory?.contract?.id },
          category: { id: this.contractCategory.category?.id },
          contract_category: { id: this.contractCategory?.id }
        }
        this.store.dispatch(saveCategoryTemplateAction({ payload }));
      }
    });
  }

  public UpdateCategoryName(category: ICategory): void {
    const dialogRef = this.dialog.open(ContractCategoryDialogComponent, {
      data: { category }
    });
    dialogRef.afterClosed().subscribe(payload => {
      if (payload) {
        this.store.dispatch(updateCategoryAction({ payload, contractCategory: this.contractCategory }));
      }
    });
  }
}
