import { addToChecklistAction, highlightChecklistAction, removeChecklistItemsAction, addTermToChecklistAction, removeAllSelectedTerms, removeToChecklistProductsAction } from './../../store/actions/contract-checklist.action';
import { sortByAsc } from 'src/app/shared/util/sort';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { ReOrderImagesAction, deleteContractAction } from './../../store/actions/contracts.action';
import { tap, take, map, takeUntil, debounceTime } from 'rxjs/operators';
import { getContractCategorySelector } from './../../store/selectors/contract-category.selector';
import { addContractCategoryAction, loadContractCategoryAction } from './../../store/actions/contract-category.action';
import { ContractCategoryDialogComponent } from '../../../dialogs/components/contract-category/contract-category-dialog.component';
import { loadContractProducts, clearPreSelectProducts } from './../../store/actions/contract-product.action';
import { getContractById } from './../../store/selectors/contracts.selector';
import { User } from './../../../users/users.models';
import { AppState } from './../../../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContract, IProductImage, IContractCategory, ICategory, IContractChecklist, IContractCategoryTerm, IContractChecklistItem, IContractProduct, ISavedChecklist, ISavedChecklistPayload } from './../../contract.model';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ContractAddDialogComponent } from 'src/app/modules/dialogs/components/contracts-add/contract-add-dialog.component';
import { ContractTemplateDialogComponent } from 'src/app/modules/dialogs/components/contract-template/contract-template-dialog.component';
import { GenericPageDetailComponent } from 'src/app/shared/generics/generic-page-detail';
import { Observable, fromEvent, of } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddEditState } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { getChecklistItemsSelector, getchecklistProductsSelector, getSelectedTermsSelector } from '../../store/selectors/contract-checklist.selector';
import { saveChecklistAction } from '../../store/actions/saved-checklist.action';

@Component({
  selector: 'il-contract-detail-page',
  templateUrl: './contract-detail-page.component.html',
  styleUrls: ['./contract-detail-page.component.scss']
})

export class ContractDetailPageComponent extends GenericPageDetailComponent<IContract> implements OnInit {
  public id: string;
  public $contract: Observable<IContract>;
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public options: Array<{ id: number, label: string, icon: string, action?: () => void }>;
  public showRightNav: boolean = false;
  public dragStartSpecs: boolean = false;
  public imgUrl: string = environment.apiImagePath;
  public contractImages: IProductImage[];
  public images: any[];
  public contract: IContract;
  public contractCategories: IContractCategory[];
  public checklistItems: IContractChecklistItem[] = [];
  public checkListProducts: IContractProduct[] = [];
  public formChecklist: FormGroup;
  public selectedTerms: string[];

  @Output()
  public openNavChange = new EventEmitter<boolean>();
  @ViewChild('scrollPnl', { static: false }) public scrollPnl: any;

  constructor(private router: Router, private store: Store<AppState>, private route: ActivatedRoute, public fb: FormBuilder, public dialog: MatDialog) {
    super();
    this.form = this.fb.group({
      id: [null],
      contract_name: [null],
      venue: [null],
      startDate: [null],
      delivery_date: [null],
      details: [null],
      images: [null]
    });
    this.formChecklist = this.fb.group({
      assignedTo: ['1'],
      desiredRunDate: [new Date()]
    });
  }

  ngOnInit() {
    this.options = [
      {
        id: 1,
        label: 'Edit contract',
        icon: 'edit-icon-blue.svg',
        action: this.editContract
      },
      {
        id: 2,
        label: 'Download',
        icon: 'download-icon-blue.svg'
      },
      {
        id: 3,
        label: 'Create or update checklist',
        icon: 'templates-icon-blue.svg',
        action: this.createUpdateTemplate
      },
      {
        id: 4,
        label: 'Save as template',
        icon: 'save-icon-blue.svg',
        action: this.saveContractAsTemplate
      },
      {
        id: 5,
        label: 'Create Category',
        icon: 'save-icon-blue.svg',
        action: this.onCreateCategory
      },
      {
        id: 6,
        label: 'Delete contract',
        icon: 'delete-icon-red.svg',
        action: this.onDeleteContract
      }
    ];

    fromEvent(window, "scroll").subscribe((e: any) => {
      document.querySelector('.inner-container').scrollTop = (document.documentElement.scrollTop);
    });

    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      /* load contract products also.. */
      this.store.dispatch(loadContractProducts({ id: this.id }));

      this.$contract = this.store.pipe(select(getContractById(this.id)));
      /* passed the contract images to a variable array so we can drag and drop */
      this.$contract && this.$contract.subscribe(c => {
        if (c) {
          /* get category by contract id */
          this.store.dispatch(loadContractCategoryAction({ id: c.id }));

          this.form.patchValue(c);
          this.contractImages = c.images.sort((a, b) => sortByAsc(a, b, 'position'));
        }
      });
    }

    this.store.pipe(select(getContractCategorySelector),
      takeUntil(this.$unsubscribe),
      tap(cc => this.contractCategories = cc))
      .subscribe();

    /* get checklist products */
    this.store.pipe(select(getchecklistProductsSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(items => {
        this.checkListProducts = items || [];
      });

    /* collect all items that is added to checklists */
    this.store.pipe(select(getChecklistItemsSelector),
      takeUntil(this.$unsubscribe),
      tap(checklist => {
        if (checklist && checklist.length > 0)
          this.checklistItems = checklist;
      })).subscribe();

    /* collect all selected terms */
    this.store.pipe(select(getSelectedTermsSelector),
      takeUntil(this.$unsubscribe),
      tap(terms => this.selectedTerms = terms))
      .subscribe();
  }

  public onSaveChecklist(): void {
    /* get the selected checklist product/s ids,
      it will be the basis of our saved checklist item/s
     */
    const checklistProductIds = this.checkListProducts && this.checkListProducts.map(cp => cp._id);
    /* get the checklist item base on product ids */
    const selectedChecklistItems = this.checklistItems && this.checklistItems.filter(ci => {
      return checklistProductIds && checklistProductIds.includes(ci.checklist_product.id)
    }).map(ci => ci.id);

    const payload: ISavedChecklistPayload = {
      checklist_name: `Checklist-${new Date().getTime()}`,
      assigned_to: this.formChecklist.get('assignedTo').value,
      desired_run_date: this.formChecklist.get('desiredRunDate').value,
      checklist_items: selectedChecklistItems
    }

    if (payload) {
      this.store.dispatch(saveChecklistAction({ payload }))
    }
  }

  public get isChecklistValid(): boolean {
    return this.formChecklist.valid
      && (this.checkListProducts && this.checkListProducts.length > 0)
      && (this.checklistItems && this.checklistItems.length > 0);
  }

  public onToggleTerm(categoryTerm: IContractCategoryTerm): void {
    if (this.checkListProducts && this.checkListProducts.length === 0) return;
    /* 
      we will build the checklist payload here
      so we can update it easily when toggling the terms
    */
    const payload: IContractChecklist = {
      checklist_contract: { id: this.id },
      checklist_category: { id: categoryTerm.category_id },
      checklist_term: { id: categoryTerm.term_id },
      checklist_product: [...this.checkListProducts.map(i => {
        return { id: i._id };
      })],
      desired_run_date: this.formChecklist.get('desiredRunDate').value,
      assigned_to: this.formChecklist.get('assignedTo').value,
    }

    /* look for matches in the state */
    const match: IContractChecklistItem[] = this.checklistItems
      .filter(c => c.checklist_category.id === categoryTerm.category_id
        && c.checklist_term.id === categoryTerm.term_id
        && this.checkListProducts.filter(cp => cp.id === c.checklist_product.product.id).shift());

    /* transform product to array of ids */
    Object.assign(payload, match);

    /* if the selected product doesnt exist, then add else then remove it */
    if (categoryTerm.checked) {
      this.store.dispatch(addToChecklistAction({ payload }));
    } else {
      this.store.dispatch(removeChecklistItemsAction({ payload: match }));

      /* we need to remove the checklist product here since we cannot include it in multi delete response */
      const checklistProduct = match.map(i => i.checklist_product).shift()
      setTimeout(() => {
        if (this.selectedTerms && this.selectedTerms.length === 0) {
          if (checklistProduct && checklistProduct.product)
            this.store.dispatch(removeToChecklistProductsAction({
              item: {
                _id: checklistProduct.id,
                id: checklistProduct.product.id
              }
            }))
        }
      }, 300);
    }
  }

  private onDeleteContract = (): void => {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: {
        action: 0
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.form.get('id').value) {
        this.store.dispatch(deleteContractAction({ id: this.form.get('id').value }));
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard/contracts');
        });
      } else { }
    });
  }

  public onCloseRighNav(event: any): void {
    setTimeout(() => {
      /* remove checklist highlight */
      this.store.dispatch(highlightChecklistAction({ highlight: false }));
      this.showRightNav = !event;
      this.formChecklist.reset();
    }, 100);
  }

  public onCreateCategory = (): void => {
    const dialogRef = this.dialog.open(ContractCategoryDialogComponent, {
      height: '200px'
    });
    dialogRef.afterClosed().subscribe((category: ICategory) => {
      if (category) {
        const payload: IContractCategory = {
          category: _.pickBy(category, _.identity),
          contract: {
            id: this.form.get('id').value,
            contract_name: this.form.get('contract_name').value
          }
        }
        this.store.dispatch(addContractCategoryAction({ payload }));
      }
    });
  }

  public get hasImgs(): boolean {
    return this.contractImages && this.contractImages.length > 0;
  }

  public get getContractImages(): IProductImage[] {
    return this.contractImages.slice(0, 4);
  }

  public getFullName(user: User): string {
    return user ? `${user.firstname} ${user.lastname}` : '';
  }

  public getBg = (url: string): string => `url(${url})`;

  public createUpdateTemplate = (): void => {
    if (!this.contractCategories ||
      (this.contractCategories && this.contractCategories.length === 0)) {
      alert('Please add a category and terms');
      return;
    }

    this.showRightNav = !this.showRightNav;
    this.openNavChange.emit(this.showRightNav);

    /* clear existing checklists */
    this.store.dispatch(clearPreSelectProducts());

    /* clear all checklist terms  */
    this.store.dispatch(removeAllSelectedTerms());

    /* set checklist to highlight when opening right nav */
    this.store.dispatch(highlightChecklistAction({ highlight: true }));
  }

  public editContract = (): void => {
    const dialogRef = this.dialog.open(ContractAddDialogComponent, {
      data: {
        id: this.id,
        formValues: this.form.value,
        state: AddEditState.Edit
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  public saveContractAsTemplate = (): void => {
    const dialogRef = this.dialog.open(ContractTemplateDialogComponent, {
      data: {
        formValues: this.form.value,
        state: AddEditState.Edit
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  public trackByField = (i: number, field: IProductImage) => field.position = i;

  public dropImages(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.contractImages, event.previousIndex, event.currentIndex);

    /* update reorder images */
    setTimeout(() => this.store.dispatch(ReOrderImagesAction({ images: this.contractImages })), 200);
  }

  public dropSpecs(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.contractCategories, event.previousIndex, event.currentIndex);
  }

  public dragStartedSpecs(event: any) {
    this.dragStartSpecs = event;
  }

  public handleRemoveSpecsTitle(id: string) {
    this.contractCategories.find(cc => cc.id === id).category.category_name = '';
  }

  public handleRemoveProductSpecs(id: string) {
    this.contractCategories = this.contractCategories.filter(cc => cc.id !== id);
  }
}
