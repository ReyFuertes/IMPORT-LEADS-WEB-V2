import { addItemToChecklistTermsAction, clearAllSelectedTerms, clearChecklistProductsAction, processItemsToChecklistAction, removeTermFormChecklistAction, processItemsToChecklistEntitiesAction, removeItemFromEntitiesAction, clearEntitiesAction } from './../../store/actions/contract-checklist.action';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { reOrderImagesAction, deleteContractAction } from './../../store/actions/contracts.action';
import { tap, takeUntil } from 'rxjs/operators';
import { getContractCategorySelector } from './../../store/selectors/contract-category.selector';
import { addContractCategoryAction, addMultipleContractCategoryAction, loadContractCategoryAction } from './../../store/actions/contract-category.action';
import { ContractCategoryDialogComponent } from '../../../dialogs/components/contract-category/contract-category-dialog.component';
import { loadContractProductsAction, clearPreSelectProducts } from './../../store/actions/contract-product.action';
import { getContractById } from './../../store/selectors/contracts.selector';
import { AppState } from './../../../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContract, IProductImage, IContractCategory, ICategory, IContractCategoryTerm, IContractChecklistItem, IContractProduct, ISavedChecklistPayload, ICommonIdPayload, IContractTermProduct } from './../../contract.model';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ContractTemplateDialogComponent } from 'src/app/modules/dialogs/components/contract-template/contract-template-dialog.component';
import { GenericPageDetailComponent } from 'src/app/shared/generics/generic-page-detail';
import { Observable, fromEvent, of } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddEditState } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { getChecklistSelector } from '../../store/selectors/contract-checklist.selector';
import { saveChecklistAction } from '../../store/actions/saved-checklist.action';
import { IUser } from 'src/app/modules/user-management/user-mgmt.model';
import { ContractCategoryImportDialogComponent } from 'src/app/modules/dialogs/components/contract-category-import/contract-category-import.component';
import { importContractTemplateAction, saveContractTemplateAction } from '../../store/actions/contract-template.action';
import { IVenue } from 'src/app/modules/venues/venues.models';
import { getVenuesSelector } from 'src/app/modules/venues/store/venues.selector';
import { DomSanitizer } from '@angular/platform-browser';
import { CONTRACTSROUTE } from 'src/app/shared/constants/routes';
import { ContractImportTemplateDialogComponent } from 'src/app/modules/dialogs/components/contract-import-template-dialog/contract-import-template-dialog.component';
import { StorageService } from 'src/app/services/storage.service';
import { ContractAddDialogComponent } from 'src/app/modules/dialogs/components/contract-add-dialog/contract-add-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

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
  public checklistTerms: IContractTermProduct[];
  public savedChecklistSourceId: string;
  public user: IUser;
  public checklistEntities: IContractChecklistItem[] = [];
  public venues: IVenue[];
  public apiImagePath: string = environment.apiImagePath;
  public apiContractsImagePath: string = environment.apiContractsImagePath;

  @Output() public openNavChange = new EventEmitter<boolean>();
  @ViewChild('scrollPnl', { static: false }) public scrollPnl: any;

  constructor(public translateService: TranslateService, private storageSrv: StorageService, private sanitizer: DomSanitizer, private router: Router, private store: Store<AppState>, private route: ActivatedRoute, public fb: FormBuilder, public dialog: MatDialog, cdRef: ChangeDetectorRef) {
    super(cdRef);

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
      assignedTo: [null, Validators.required],
      desiredRunDate: [new Date(), Validators.required]
    });

    const at = JSON.parse(this.storageSrv.get('at')) || null;
    if (at && at.user) this.user = at.user;

    this.store.pipe(select(getVenuesSelector), takeUntil(this.$unsubscribe))
      .subscribe(venues => {
        this.venues = venues.map(vp => {
          return {
            id: vp.id,
            name: vp.name,
            image: vp.image
          }
        });
      });
  }

  ngOnInit() {
    this.options = [{
      id: 1,
      label: 'Edit contract',
      icon: 'edit-icon-blue.svg',
      action: this.editContract
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
      label: 'Import Contract',
      icon: 'import.svg',
      action: this.importContractTemplate
    },
    {
      id: 6,
      label: 'Create Category',
      icon: 'save-icon-blue.svg',
      action: this.onCreateCategory
    },
    {
      id: 7,
      label: 'Import Category',
      icon: 'save-icon-blue.svg',
      action: this.onImportCategory
    }];

    fromEvent(window, "scroll").subscribe((e: any) => {
      document.querySelector('.inner-container').scrollTop = (document.documentElement.scrollTop);
    });

    this.id = this.route?.snapshot?.paramMap?.get('id') || null;
    if (this.id) {
      /* load contract products */
      this.store.dispatch(loadContractProductsAction({ id: this.id }));

      this.$contract = this.store.pipe(select(getContractById(this.id)));

      /* passed the contract images to a variable array so we can drag and drop */
      this.$contract?.pipe(takeUntil(this.$unsubscribe))
        .subscribe(c => {
          if (c) {

            /* get category by contract id */
            this.store.dispatch(loadContractCategoryAction({ id: c.id }));

            this.form.patchValue(c);

            this.contractImages = Object.assign([], c.images.slice(0, 4))//.sort((a, b) => sortByAsc(a, b, 'position'));
          }
        });
    }

    this.store.pipe(select(getContractCategorySelector),
      takeUntil(this.$unsubscribe),
      tap(res => {
        this.contractCategories = res;
      })).subscribe();

    this.store.pipe(select(getChecklistSelector),
      takeUntil(this.$unsubscribe))
      .pipe(tap(res => {
        this.checklistItems = res.checklistItems || [];
        this.checkListProducts = res.checklistProducts || [];
        this.checklistTerms = res.checklistTerms || [];
        this.savedChecklistSourceId = res?.saveChecklistSource?.id;
        this.checklistEntities = Object.values(res?.entities) || [];

      })).subscribe();
  }

  public getVenueImage(contract: IContract): any {
    const venue = this.venues?.filter(v => v.id === contract?.venue?.id)?.shift();
    const imageName = venue?.image?.filename;

    if (!imageName) return this.sanitizer.bypassSecurityTrustStyle(`url(${this.imgPath}no-image-32x32.png)`);

    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.apiImagePath}${imageName})`);
  }

  public onDownload(): void { }

  public onReport(): void {
    this.router.navigateByUrl(`/report/${this.id}/agreement`);
  }

  public onToggleTerm(term: IContractCategoryTerm): void {
    if (this.checkListProducts && this.checkListProducts.length === 0) return;

    if (term.checked) {
      this.checkListProducts.forEach((product: ICommonIdPayload) => {
        /* add checklist terms */
        this.store.dispatch(addItemToChecklistTermsAction({
          term: {
            term_id: term.term_id,
            product_id: product.id,
            contract_id: this.id,
            category_id: term.category_id
          }
        }));
      });

      /* process items to checklist items */
      this.store.dispatch(processItemsToChecklistAction());

      /* after we toggle the we also wanted to be process it in the entities */
      this.store.dispatch(processItemsToChecklistEntitiesAction());
    } else {
      this.store.dispatch(removeTermFormChecklistAction({
        term: { term_id: term.term_id }
      }));

      this.checkListProducts.forEach((product: ICommonIdPayload) => {
        this.store.dispatch(removeItemFromEntitiesAction({
          item: {
            contract_product: { product: { id: product.id } },
            contract_term: { id: term.term_id }
          }
        }));

        /* remove highlighted product/s when checklist is cleared up */
        if (this.checklistTerms && this.checklistTerms.length === 0) {
          this.store.dispatch(clearChecklistProductsAction());
        }
      });
    }
  }

  public onSaveChecklist(): void {
    const checklistItems = this.checklistEntities?.map((c: IContractChecklistItem) => {
      return {
        contract_category: { id: c?.contract_category?.id },
        contract_contract: { id: c?.contract_contract?.id },
        contract_product: { id: c?.contract_product?.id },
        contract_term: { id: c?.contract_term?.id },
      }
    });

    const payload: ISavedChecklistPayload = {
      id: this.savedChecklistSourceId,
      checklist_name: `cl-${new Date().getTime()}`,
      assigned_to: this.formChecklist.get('assignedTo').value,
      desired_run_date: this.formChecklist.get('desiredRunDate').value,
      checklist_items: checklistItems,
      checklist_contract: { id: this.id },
      user: { id: this.formChecklist.get('assignedTo').value }
    }

    if (payload) {
      this.store.dispatch(saveChecklistAction({ payload }));

      setTimeout(() => {
        this.formChecklist.reset();
      }, 1000);
    }
  }

  public onDeleteContract(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result && this.form.get('id').value) {
          this.store.dispatch(deleteContractAction({ id: this.form.get('id').value }));
          setTimeout(() => {
            this.router.navigateByUrl(CONTRACTSROUTE);
          });
        } else { }
      });
  }

  public onCloseRighNav(event: any): void {
    setTimeout(() => {
      /* clear selected checklist product/s */
      this.store.dispatch(clearChecklistProductsAction());
      this.store.dispatch(clearEntitiesAction());

      this.showRightNav = !event;
      this.formChecklist.reset();
    }, 100);
  }

  public onCreateCategory = (): void => {
    const dialogRef = this.dialog.open(ContractCategoryDialogComponent, {
      height: '200px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe((category: ICategory) => {
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

  public onImportCategory = (): void => {
    const dialogRef = this.dialog.open(ContractCategoryImportDialogComponent, {
      height: '455px',
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload) {

        this.store.dispatch(addMultipleContractCategoryAction({
          payload: {
            ...payload,
            contract: {
              id: this.form.get('id').value,
              contract_name: this.form.get('contract_name').value
            }
          }
        }));

        /* reload all contract category */
        setTimeout(() => {
          this.store.dispatch(loadContractCategoryAction({ id: this.form.get('id').value }));
        }, 3000);
      }
    });
  }

  public getBg = (url: string): string => `url(${url})`;

  public createUpdateTemplate = (): void => {
    if (!this.contractCategories ||
      (this.contractCategories && this.contractCategories?.length === 0)) {
      alert('Please add a category and terms');
      return;
    }

    this.showRightNav = !this.showRightNav;
    this.openNavChange.emit(this.showRightNav);

    /* clear existing checklists */
    this.store.dispatch(clearPreSelectProducts());

    /* clear all checklist terms  */
    this.store.dispatch(clearAllSelectedTerms());
  }

  public editContract = (): void => {
    const dialogRef = this.dialog.open(ContractAddDialogComponent, {
      data: {
        id: this.id,
        formValues: this.form.value,
        state: AddEditState.Edit
      }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe();
  }

  public importContractTemplate = (): void => {
    const dialogRef = this.dialog.open(ContractImportTemplateDialogComponent, {
      width: '600px',
      data: { state: AddEditState.Import }
    });
    dialogRef.afterClosed().subscribe(_payload => {
      if (_payload) {
        let payload = {
          ..._payload,
          current_contract: this.form.value
        }
        this.store.dispatch(importContractTemplateAction({ payload }));
      }
    });
  }

  public saveContractAsTemplate = (): void => {
    const dialogRef = this.dialog.open(ContractTemplateDialogComponent, {
      data: {
        formValues: this.form.value,
        state: AddEditState.Edit
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const payload = {
          title: res.title,
          description: res.description,
          contract: { id: this.form.get('id').value }
        }
        this.store.dispatch(saveContractTemplateAction({ payload }));
      }
    });
  }

  public trackByField = (i: number, field: any) => {
    return field.position = i;
  };

  public dropImages(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.contractImages, event.previousIndex, event.currentIndex);

    /* update reorder images */
    setTimeout(() => this.store.dispatch(reOrderImagesAction({ images: this.contractImages })), 200);
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

  public get isChecklistValid(): boolean {
    return this.formChecklist.valid && this.checklistEntities.length > 0;
  }

  public get hasImgs(): boolean {
    return this.contractImages && this.contractImages.length > 0;
  }

  public get getContractImages(): IProductImage[] {
    return this.contractImages;
  }
}
