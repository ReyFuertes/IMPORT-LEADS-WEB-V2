import { loadActiveInspectionAction } from './../../../inspections/store/actions/inspection.action';
import { getChecklistSelector } from './../../store/selectors/contract-checklist.selector';
import { addItemToSourceAction, addItemToChecklistTermsAction, addItemToChecklistProductsAction, removeItemFromChecklistProductsAction, clearChecklistProductsAction, clearAllSelectedTerms, clearChecklistSourceAction, setToMultiUpdateStatusAction, resetUpdateStatusAction, processItemsToChecklistAction, processItemsToChecklistEntitiesAction, removeItemFromEntitiesByProductId } from './../../store/actions/contract-checklist.action';
import { getSelectedProductsSelector } from './../../store/selectors/contract-product-selector';
import { getProductsSelector } from './../../../products/store/products.selector';
import { IProduct } from './../../../products/products.model';
import { getAllContractProductsSelector } from './../../store/selectors/contracts.selector';
import { addContractProductsAction, deleteContractProduct, updateContractProductAction, selectProductAction, removeSelectedProductAction, clearPreSelectProducts, loadContractProductsAction } from './../../store/actions/contract-product.action';
import { AppState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { PillStateType, IContract, IContractProduct, IContractChecklistItem, ICommonIdPayload, IContractTermProduct, ProductStatusType } from './../../contract.model';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { GenericDetailPageComponent } from 'src/app/shared/generics/generic-detail-page';
import { sortByDesc } from 'src/app/shared/util/sort';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-contract-detail-products',
  templateUrl: './contract-detail-products.component.html',
  styleUrls: ['./contract-detail-products.component.scss']
})

export class ContractDetailProductsComponent extends GenericDetailPageComponent implements OnInit, AfterViewInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public productsArray: FormArray;
  public formSubProdsArr: FormArray;
  public productPillsArr: IProduct[] = [];
  public form: FormGroup;
  public hasSubProducts: boolean = false;
  public isEditProduct: boolean = false;
  public state: PillStateType = PillStateType.default;
  public suggestions: ISimpleItem[];
  public isDisabled: boolean = false;
  public initInputProduct: boolean = false;
  public $contractProducts: Observable<IContractProduct[]>;
  public $products: Observable<IProduct[]>;
  public selectedProduct: IContractProduct;
  public checklistEntities: IContractChecklistItem[] = [];
  public checklistItems: IContractChecklistItem[] = [];
  public checklistTerms: IContractTermProduct[] = [];
  public checklistSource: ICommonIdPayload;
  public checklistProducts: IContractProduct[] = [];
  public isAddState: boolean = false;

  @Input() public inCheckListing: boolean = false;
  @Input() public contract: IContract;

  constructor(public translateService: TranslateService, private store: Store<AppState>, private dialog: MatDialog, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    super();

    this.form = this.fb.group({
      id: [null],
      product_name: [null, Validators.required],
      qty: [null, Validators.required],
      cost: [null, Validators.required],
      sub_products: new FormArray([]),
      contract: [null],
      cp_id: [null]
    });

    //get the sub total of all productSet
    this.form.get('sub_products').valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(children => {
        if (children) {
          const childsCost = children.reduce((sum, current) => parseFloat(sum) + parseFloat(current.cost), 0) || 0;
          const parentCost = this.form.get('cost').value;

          if (parseFloat(childsCost) === parseFloat(parentCost)) {
            this.isDisabled = false;
          } else {
            this.isDisabled = true;
          }

          //check if the sub product is edited then update the id
          this.formSubProdsArr = this.form.get('sub_products') as FormArray;
          let match: boolean = false;
          this.$products.subscribe((products: IProduct[]) => {
            products.forEach(product => {
              if (match) return;

              this.formSubProdsArr.value.forEach(p => {
                if (p.id === product.id || p.product_name === product.product_name) {
                  match = true;
                  p.id = product.id
                  return;
                } else {
                  match = false;
                  delete p.id;
                  return;
                }
              });
            });
          })
        }
      });

    //validate value when changing cost price in the parent
    this.form.get('cost').valueChanges.pipe(takeUntil(this.$unsubscribe))
      .subscribe(costValue => {
        this.formSubProdsArr = this.form.get('sub_products') as FormArray;
        const childsCost = this.formSubProdsArr.value?.reduce((sum, current) => parseFloat(sum) + parseFloat(current?.cost), 0) || 0;

        if (parseFloat(childsCost) === parseFloat(costValue)) {
          this.isDisabled = false;
        } else if(parseFloat(childsCost) === 0) { //if product doesnt have children
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      });

    this.store.pipe(select(getChecklistSelector),
      takeUntil(this.$unsubscribe))
      .pipe(tap(res => {
        this.checklistTerms = res.checklistTerms || [];
        this.checklistSource = res.checklistSource || null;
        this.checklistProducts = res.checklistProducts || [];
        this.checklistEntities = Object.values(res.entities) || [];
        this.checklistItems = res.checklistItems || [];
      })).subscribe();
  }

  public get hasAdminManagerRole(): string[] {
    return ['admin', 'manager'];
  }

  ngOnInit() {
    this.$contractProducts = this.store.pipe(select(getAllContractProductsSelector));

    /* product suggestions */
    this.$products = this.store.pipe(select(getProductsSelector), takeUntil(this.$unsubscribe));
    this.$products.subscribe(product => {
      if (product) {
        const parent = product.filter(o => o.parent).filter(Boolean);
        const child = product.map(p => {
          return { id: p.id, product_name: p.product_name }
        });

        /* get all suggestions */
        this.suggestions = child.map(cp => {
          const _parents = parent.filter(value => value.parent.id === cp.id)
            .map(value => ` - (${value.product_name})`);
          return {
            value: cp.id,
            label: cp.product_name + _parents.join(' ')
          }
        })
      }
    });
    /* listen to selected products */
    this.store.pipe(select(getSelectedProductsSelector),
      takeUntil(this.$unsubscribe),
    ).subscribe(sp => this.selectedProduct = sp);

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public deSelectChange(item: ICommonIdPayload): void {
    if (this.inCheckListing) {
      /* remove to checklist products */
      this.store.dispatch(removeItemFromChecklistProductsAction({ item }));

      /* if the checklist product falls to 1 then reset the status to single update */
      if (this.checklistProducts.length === 1)
        this.store.dispatch(resetUpdateStatusAction());

      /* if all checklist products is deselected, then remove all the terms and source */
      if (this.checklistProducts.length === 0) {
        this.store.dispatch(clearChecklistSourceAction());
        this.store.dispatch(clearAllSelectedTerms());
      }

      this.store.dispatch(processItemsToChecklistAction());
    } else {
      this.store.dispatch(removeSelectedProductAction());
    }

    if (!this.inCheckListing) this.onResetForm();
  };

  public preSelectChange(item: ICommonIdPayload, isPreselected?: boolean): void {
    /* in checklisting */
    if (!isPreselected && this.inCheckListing) {
      const id = (this.checklistSource && this.checklistSource.id) || null;

      /* check if the user is multi updating */
      if (this.checklistTerms && this.checklistTerms.length === 0
        && this.checklistProducts.length > 1) {
        this.store.dispatch(setToMultiUpdateStatusAction());
      }

      /* if product is the first selection then add it to the source checklist*/
      if (!this.checklistSource) {
        this.store.dispatch(addItemToSourceAction({ item }))
      }

      /* find by product id */
      const entities = this.checklistEntities.filter(ci => ci?.contract_product?.product?.id === item.id);

      /* perform apply and override here */
      if (this.checklistSource && this.checklistProducts.length >= 1) {
        const action = this.isProductHasChecklist(item.id) ? ProductStatusType.Override : ProductStatusType.Apply;

        /* if the selected product doesnt have a checklist and the source has a checklist */
        if (this.isProductHasChecklist(item.id) || !this.isProductHasChecklist(item.id) && this.isProductHasChecklist(id))
          this.overrideOrApply(item, action);
        else
          this.addToChecklist(item, entities);
      } else {
        this.addToChecklist(item, entities);
      }
    } else {
      this.isAddState = true;

      this.store.dispatch(selectProductAction({ item }));
    }
  }

  private addToChecklist(item: ICommonIdPayload, entities: IContractChecklistItem[]): void {
    this.store.dispatch(addItemToChecklistProductsAction({ item }));

    /* get all the terms of selected source */
    if (this.checklistSource && this.checklistProducts.length === 1) {

      entities && entities.forEach(item => {
        this.store.dispatch(addItemToChecklistTermsAction({
          term: {
            term_id: item.contract_term.id,
            product_id: item.contract_product.product.id,
            contract_id: item.contract_product.id,
            category_id: item.contract_category.id
          }
        }));
      });
    }
    this.store.dispatch(processItemsToChecklistAction());
  }

  private overrideOrApply(item: ICommonIdPayload, action: ProductStatusType): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          if (action === ProductStatusType.Override) {
            /* remove entities on selected product */
            this.store.dispatch(removeItemFromEntitiesByProductId({ id: item.id }));

            /* if override, then add the product  */
            this.store.dispatch(addItemToChecklistProductsAction({ item }));

            /* process to checklist items */
            setTimeout(() => {
              this.store.dispatch(processItemsToChecklistAction());
            }, 100);

          } else if (action === ProductStatusType.Apply) {
            this.store.dispatch(addItemToChecklistProductsAction({ item }));
          }
          /* process to checklist entities */
          setTimeout(() => {
            this.store.dispatch(processItemsToChecklistEntitiesAction());
          }, 150);
        }
      });
  }

  private isProductHasChecklist(id: string): boolean {
    return id && this.checklistEntities?.find(e => (e.contract_product
        && e.contract_product.product.id === id))
      ? true : false;
  }

  public hasChecklist(id: string): boolean {
    let preSelected = this.checklistEntities?.find(c => c?.contract_product?.product?.id === id);

    const ret = this.checklistEntities && this.inCheckListing && preSelected;
    return ret ? true : false;
  }

  public isChecklistProductSelected(id: string): boolean {
    return this.checklistProducts?.length > 0
      && this.checklistProducts.find(c => c.id === id) ? true : false;
  }

  public isProductSelected(id: string): boolean {
    return !this.inCheckListing && this.selectedProduct?.id === id ? true : false;
  }

  public isSubProductSelected(id: string): boolean {
    return this.checklistProducts
      && this.checklistProducts.length > 0
      && this.checklistProducts.filter(c => c.id === id).shift() ? true : false;
  }
  /* when selecting product in checklist state */
  public isSubProductChecklistSelected(id: string): boolean {
    return this.inCheckListing
      && this.checklistProducts?.length > 0
      && this.checklistProducts.filter(c => c.id === id).shift() ? true : false;
  }
  /* when selecting product in checklist state
    we are matching the subproduct by using childid 
  */
  public isSubProductChecklistRelated(sub: any, contract_product_id: string): boolean {
    const isRelated = this.checklistEntities?.find(c => {
      return (c.contract_product?.product?.id === sub?.id /* if the product is the same */
        && c.contract_product?.id === contract_product_id) /* if product has the same checklists */
    }) ? true : false;
    return isRelated;
  }

  public fmtToSimpleItem(p: IProduct, contract_product_id: string): ISimpleItem {
    const i = { value: p?.id, label: p?.product_name, _id: contract_product_id };
    return Object.assign({}, i);
  }

  public fmtSubToSimpleItem(p: IProduct, contract_product_id: string): ISimpleItem {
    const i = { value: p?.id, label: p?.product_name, _id: contract_product_id };
    return Object.assign({}, i);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.inCheckListing && changes.inCheckListing.currentValue) {
      this.inCheckListing = changes.inCheckListing.currentValue;
    }
  }

  ngAfterViewInit() {
    this.productPillsArr = this.contract?.contract_products;
    this.cdRef.detectChanges();
  }

  public onAdd(): void {
    if (this.form.value && this.initInputProduct) {
      let payload: IContractProduct = this.fmtPayload(this.form.value);
      if (payload) {
        this.store.dispatch(addContractProductsAction({ payload }));
      }

      this.onResetForm();
    }
    if (!this.initInputProduct) this.initInputProduct = true;
  }

  public onSave(): void {
    if (this.form.value) {
      this.isEditProduct = !this.isEditProduct;
      const payload = this.fmtPayload(this.form.value);

      this.store.dispatch(updateContractProductAction({ payload }));

      /* reload checklist so it will be shown when checklisting */
      this.store.dispatch(loadActiveInspectionAction({}));
    }
  }

  private getName(name: any): any {
    if (typeof (name) === 'object') {
      return name?.product?.product_name.label?.trim() || name?.product_name?.label?.trim();
    }
    return name?.trim() || '';
  }

  private getId(obj: any): any {
    if (typeof (obj) === 'object') {
      return obj.value;
    }
    return null;
  }

  private fmtSubProducts(sp: any[]): any {
    const ret = sp?.map(sp => {
      let productName: string = '';
      let productId: string = '';
      if (typeof (sp?.product_name) === 'object') {
        productId = sp?.product_name?.value;
        productName = sp?.product_name?.label
      } else {
        productName = sp?.product?.product_name;
        productId = sp?.product?.id;
      }
      const ret = _.pickBy({
        id: productId,
        product_name: productName,
        qty: sp.qty,
        cost: sp.cost,
      }, _.identity);
      return ret;
    }) || [];

    return ret;
  }

  private fmtPayload(formValue: IProduct): any {
    const { id, product_name, qty, cost, sub_products } = formValue;

    const pid: string = this.getId(product_name);
    const ret = {
      parent: _.pickBy({
        _id: id,
        id: pid ? pid : id,
        product_name: this.getName(product_name),
        qty, cost
      }, _.identity),
      children: Object.assign([], this.fmtSubProducts(sub_products)),
      contract: { id: this.contract.id, contract_name: this.contract?.contract_name }
    }

    return ret;
  }

  public onEdit(p: any): void {
    if (this.inCheckListing) return;

    /* assign selected item to form */
    const { id, product, qty, cost, sub_products } = p;

    this.formSubProdsArr = null;
    this.initInputProduct = this.selectedProduct ? true : false;

    /* use contract product id here */
    this.form.controls['id'].patchValue(id);

    /* we use an object for passing values to suggestion control */
    this.form.controls['product_name'].patchValue({ label: product?.product_name, value: product?.id });
    this.form.controls['qty'].patchValue(qty);
    this.form.controls['cost'].patchValue(cost);
    this.form.controls['sub_products'].patchValue(this.fmtSubProducts(sub_products));

    const subProducts = this.fmtSubProducts(sub_products);
    this.formSubProdsArr = this.form.get('sub_products') as FormArray;

    if (this.formSubProdsArr) {
      this.formSubProdsArr.clear();
    }

    subProducts?.forEach(si => {
      const item = this.createSubItem({
        _id: si._id,
        id: si.id,
        /* we use an object for passing values to suggestion control */
        product_name: { label: si.product_name, value: si.id },
        qty: si.qty,
        cost: si.cost
      });
      this.formSubProdsArr.push(item);
    });

    this.hasSubProducts = this.formSubProdsArr?.length > 0;
    this.isEditProduct = this.selectedProduct ? true : false;

    if (!this.selectedProduct) {
      setTimeout(() => this.onResetForm(), 100);
    }
  }

  public onView(): void {
    this.isAddState = !this.isAddState;
    this.initInputProduct = !this.initInputProduct;

    if (!this.isAddState) {
      setTimeout(() => this.onResetForm(), 100);
      this.store.dispatch(removeSelectedProductAction());
    } else { }
  }

  public onShowSubProduct(): void {
    if (!this.formSubProdsArr || this.formSubProdsArr.length === 0) {
      this.onAddSubProduct();
    } else {
      this.formSubProdsArr.clear();
      this.form.controls['cost'].setErrors(null);
    }
    this.hasSubProducts = !this.hasSubProducts;
  }

  public onAddSubProduct(): void {
    this.formSubProdsArr = this.form.get('sub_products') as FormArray;

    /* add placehold product */
    const result = this.createSubItem({
      product_name: ['', Validators.required],
      qty: [this.form.get('qty').value, Validators.required],
      cost: [1, Validators.required]
    });

    this.formSubProdsArr.push(result);
  }

  public onRemoveProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {

          let toRemove: IContractProduct;
          this.$contractProducts
            .pipe(takeUntil(this.$unsubscribe))
            .subscribe(p => {
              toRemove = p.filter(p => p.id === product.id)[0];
              const index = p.indexOf(toRemove);
              if (index > -1) {
                p.splice(index, 1);
              }
              p.sort((a, b) => sortByDesc(a, b, 'created_at'));
            })
          /* remote product from the database */
          if (toRemove)
            this.store.dispatch(deleteContractProduct({ id: toRemove._id || toRemove.id }));

          this.onResetForm();
        }
      });
  }

  public onRemoveSubProduct(product: IProduct, i?: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: {
        action: 0
      }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          //remove item from form array
          const item = this.form.get('sub_products') as FormArray;
          item.removeAt(i);

          /* collect the contract product to be removed */
          let toRemove: any;
          this.$contractProducts
            .pipe(takeUntil(this.$unsubscribe))
            .subscribe(p => {

              let parent = Object.assign([], p.find(t => t.sub_products.find(tg => tg.id === product.id)));
              const sub_products = parent.sub_products.map(sp => {
                if (sp.id === product.id) {
                  toRemove = sp;
                  return;
                }
                return sp;
              }).filter(i => Boolean(i));

              const _p = Object.assign(parent, { sub_products });

              const index = p.findIndex(p => p.id === _p.id);
              if (index > -1) {
                p.splice(index, 1);
              }
              p.push(_p);

              p.sort((a, b) => sortByDesc(a, b, 'created_at'));

              return;
            })

          /* remote sub product from the database */
          if (toRemove) {
            this.store.dispatch(deleteContractProduct({ id: toRemove._id || toRemove.id }));
            this.onResetForm();
          }
        }
      });
  }

  public get isNavOpenAndEdit(): boolean {
    return this.inCheckListing && this.isEditProduct;
  }

  private onResetForm(): void {
    this.form.reset();
    this.hasSubProducts = false;
    this.isEditProduct = false;
    this.initInputProduct = false;
    this.formSubProdsArr.clear();
  }

  public createItem = (item: ISimpleItem): FormGroup => this.fb.group(item);

  public createSubItem = (item: IProduct): FormGroup => this.fb.group(item);

  public onRemove(id: string): void {
    const i = this.productPillsArr.findIndex(x => x.id === id);
    this.productPillsArr.splice(i);
  }

  public subProductsArr = () => this.form.get('sub_products') as FormArray;
}

