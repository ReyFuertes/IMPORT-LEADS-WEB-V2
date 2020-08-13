import { loadInspectionChecklistAction } from './../../../inspections/store/inspection.action';
import { getChecklistSourceSelector, getChecklistItemsSelector, getChecklist, getChecklistItemByContractProductIds, getChecklistTermsByProductId, getchecklistProductsSelector } from './../../store/selectors/contract-checklist.selector';
import { addItemToSourceAction, addItemToChecklistTermsAction, removeTermFormChecklistAction, addItemToChecklistProductsAction, updateChecklistSourceAction, removeItemFromChecklistProductsAction, overrideChecklistItemAction, removeChecklistItemAction, addItemToChecklist, removeAllChecklistProductsAction, removeAllSelectedTerms, removeChecklistSourceAction, setToMultiUpdateStatusAction, resetUpdateStatusAction, processItemsToChecklistAction } from './../../store/actions/contract-checklist.action';
import { getSelectedProductsSelector } from './../../store/selectors/contract-product-selector';
import { getCategoryTermsSelector } from './../../store/selectors/contract-category.selector';
import { getProductsSelector } from './../../../products/store/products.selector';
import { IProduct } from './../../../products/products.model';
import { getAllContractProductsSelector } from './../../store/selectors/contracts.selector';
import { addContractProducts, deleteContractProduct, updateContractProduct, selectProductAction, removeSelectedProductAction, clearPreSelectProducts } from './../../store/actions/contract-product.action';
import { AppState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { PillState, IContract, IContractProduct, IContractChecklist, IContractChecklistItem, IContractTerm, IOverrideChecklistItem, ICommonIdPayload } from './../../contract.model';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { take, takeUntil, tap, debounceTime } from 'rxjs/operators';
import { Subject, Observable, pipe, of } from 'rxjs';
import * as _ from 'lodash';
import { interval } from 'rxjs';
import { GenericDetailPageComponent } from 'src/app/shared/generics/generic-detail-page';

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
  public state: PillState = PillState.default;
  public suggestions: ISimpleItem[];
  public isDisabled: boolean = false;
  public initInputProduct: boolean = false;
  public $contractProducts: Observable<IContractProduct[]>;
  public $products: Observable<IProduct[]>;
  public selectedProduct: IContractProduct;
  public checklistItems: IContractChecklistItem[] = [];
  public checklistTerms: IContractTerm[] = [];
  public checklistSource: IContractChecklistItem;
  public checklistProductItems: IContractProduct[] = [];
  public isAddState: boolean = false;

  @Input()
  public inCheckListing: boolean = false;
  @Input()
  public contract: IContract;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
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

    /* get the sub total of all productSet */
    this.form.get('sub_products').valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(children => {
        if (children) {
          const childsCost = children.reduce((sum, current) => parseInt(sum) + parseInt(current.cost), 0) || 0;
          const parentCost = this.form.get('cost').value;

          /* if the value of input is less than the value of sub products cost total, mark as invalid error */
          if (parseInt(childsCost) > parseInt(parentCost)) {
            this.form.controls['cost'].setErrors({ 'invalid': true });
          } else {
            if ((parseInt(childsCost) !== parseInt(parentCost)) && children.length > 0) {
              this.isDisabled = true;
            } else {
              this.form.controls['cost'].setErrors(null);
              this.isDisabled = false;
            }
          }

          if (parseInt(childsCost) > parseInt(parentCost)) {
            this.form.controls['cost'].setErrors({ 'invalid': true });
          } else {
            this.form.controls['cost'].setErrors(null);
          }

          /* check if the sub product is edited then update the id */
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
                  return
                }
              });
            });
          })
        }
      })

    /* get checklist terms */
    this.store.pipe(select(getCategoryTermsSelector),
      takeUntil(this.$unsubscribe),
      tap(terms => {
        if (terms && terms.length > 0)
          this.checklistTerms = terms;
      })).subscribe();

    this.store.pipe(select(getChecklist), takeUntil(this.$unsubscribe))
      .subscribe(res => console.log(res))
  }

  ngOnDestroy() { }

  ngOnInit() {
    this.$contractProducts = this.store.pipe(select(getAllContractProductsSelector),
      takeUntil(this.$unsubscribe));

    /* product suggestions */
    this.$products = this.store.pipe(select(getProductsSelector),
      takeUntil(this.$unsubscribe));

    this.$products.subscribe(p => {
      if (p) {
        const parent = p.filter(o => o.parent).filter(Boolean);
        const child = p.map(p => {
          return { id: p.id, product_name: p.product_name }
        });
        /* get all suggestions */
        this.suggestions = child.map(cp => {
          const _parents = parent.filter(_p => _p.parent.id === cp.id)
            .map(_p => ` - (${_p.product_name})`);
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
      tap(sp => this.selectedProduct = sp)
    ).subscribe();

    /* listen to all checklist so we can highlight to green */
    this.store.pipe(select(getChecklistItemsSelector),
      takeUntil(this.$unsubscribe),
      tap(res => {
        this.checklistItems = res || [];
      })).subscribe();

    /* listen to checklist source */
    this.store.pipe(select(getChecklistSourceSelector),
      takeUntil(this.$unsubscribe),
      tap(source => {
        this.checklistSource = source;
      })).subscribe()

    /* get selected checklist products */
    this.store.pipe(select(getchecklistProductsSelector),
      takeUntil(this.$unsubscribe),
      tap((res: IContractProduct[]) => {
        this.checklistProductItems = res || [];
      })).subscribe();
  }

  public deSelectChange(item: ICommonIdPayload): void {
    if (this.inCheckListing) {
      /* remove to checklist products */
      this.store.dispatch(removeItemFromChecklistProductsAction({ item }));

      /* if the checklist product falls to 1 then reset the status to single update */
      if (this.checklistProductItems.length === 1) {
        this.store.dispatch(resetUpdateStatusAction());
      }

      // /* remove source checklist if matched */
      // this.store.dispatch(updateChecklistSourceAction({ item: payload }));

      // this.store.pipe(
      //   take(1),
      //   select(getChecklistTermsByProductId(payload.id)),
      //   tap((items: IContractChecklistItem[]) => {
      //     console.log('getChecklistTermsByProductId', items);
      //     /* if the checklist products is only one then remove the source and selected terms */
      //     if (this.checklistProductItems && this.checklistProductItems.length === 0
      //       && items && items.length > 0) {

      //       this.store.dispatch(removeChecklistSourceAction());
      //       this.store.dispatch(removeTermFormChecklistAction({ ids: items.map(i => i.checklist_term.id) }));
      //     }
      //   })).subscribe();

    } else {
      // this.store.dispatch(removeSelectedProductAction());
    }

    if (!this.inCheckListing)
      this.onResetForm();
  };

  public isMultiPreselecting: boolean = false;
  public preSelectChange(item: ICommonIdPayload, isPreselected?: boolean): void {
    /* in checklisting */
    if (!isPreselected && this.inCheckListing) {
      /* if product is the first selection then add it to the source checklist*/
      if (!this.checklistSource) {
        this.store.dispatch(addItemToSourceAction({ item }))
      }

      /* add item to checklist products */
      this.store.dispatch(addItemToChecklistProductsAction({ item }));

      /* check if the user is multi updating */
      if (this.checklistTerms && this.checklistTerms.length === 0
        && this.checklistProductItems.length > 1) {
        console.log('selecting products without a term');

        this.store.dispatch(setToMultiUpdateStatusAction());
      }

      this.store.dispatch(processItemsToChecklistAction());

      // /* check if the selected item has a source in the checklist */
      // const hasSource = !!this.checklistSource;

      // const hasChecklistItems = this.checklistItems
      //   .filter(c => c.checklist_product.id === payload._id).shift();

      // /* if product is a source then preselect immediately */
      // if (!hasSource) {
      //   this.checklistProductItems.push(payload);
      //   this.store.dispatch(addItemToChecklistProductsAction({ items: this.checklistProductItems }));
      // } else {
      //   /* check if the selected product match with the source
      //     if not then override or apply changes
      //   */
      //   if (this.checklistTerms && this.checklistTerms.length > 0)
      //     this.overrideOrApplyChanges(isPreselected, payload, hasSource, hasChecklistItems);
      // }

      // /* get the preselect term/s base on product selection */
      // const items: IContractChecklistItem[] = this.checklistItems
      //   .filter(i => i.checklist_product.id === payload._id);

      // /* if the selection doesnt have a source and not preselected the terms  */
      // if (!isPreselected && (items && items.length > 0) && !hasSource) {
      //   const ids = items && items.map(i => i.checklist_term.id);

      //   this.store.dispatch(addItemToChecklistTermsAction({ ids }));
      // }
    } else {
      this.isAddState = true;
      this.store.dispatch(selectProductAction({ item }));
    }
  }

  private overrideOrApplyChanges(isPreselected: boolean, payload: ISimpleItem, hasSource: boolean, hasChecklistItems: IContractChecklistItem): void {
    if (hasSource && !isPreselected && this.inCheckListing) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '410px',
        data: { action: hasChecklistItems ? 1 : 2 }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && hasChecklistItems || result && !hasChecklistItems) {
          /* get the item from the state entities and use it to override the checklist item */
          this.store.pipe(
            take(1),
            select(getChecklistItemByContractProductIds(payload._id, this.contract.id)),
            tap((destination: IContractChecklistItem) => {
              const item: IOverrideChecklistItem = {
                source: this.checklistSource,
                destination: destination || {
                  checklist_contract: { id: this.contract.id },
                  checklist_product: { id: payload._id }
                }
              };
              /* we need to remove the destination because we need to replace it */
              this.store.dispatch(removeChecklistItemAction({ item: item.destination }));

              this.store.dispatch(overrideChecklistItemAction({ item }));

              /* highlight checklist product items */
              this.checklistProductItems.push(payload);
              //this.store.dispatch(addItemToChecklistProductsAction({ items: this.checklistProductItems }));
            })).subscribe();

        } else if (!result) {
          /* remove and change the source, get the checklist item base on payload */
          const source = this.checklistItems.filter(s => s.checklist_product.id === payload._id).shift();
          if (source) {
            //this.store.dispatch(addItemToSourceAction({ item: source }))

            /* remove and add checklist products */
            this.store.dispatch(removeAllChecklistProductsAction());
            this.checklistProductItems.push(payload);
            //this.store.dispatch(addItemToChecklistProductsAction({ items: this.checklistProductItems }));

            /* remove selected terms */
            this.store.dispatch(removeAllSelectedTerms());
            const sourceTerms = this.checklistItems.filter(
              s => s.checklist_term.id === source.checklist_term.id
                && s.checklist_product.id === source.checklist_product.id);
            //this.store.dispatch(addItemToChecklistTermsAction({ ids: sourceTerms.map(t => t.checklist_term.id) }));
          }
        }
      });
    }
  }

  public hasChecklist(id: string): boolean {
    let preSelected = this.checklistItems && this.checklistItems
      .filter(c => c.checklist_product && c.checklist_product.product.id === id).shift();

    const ret = this.checklistItems && this.inCheckListing && preSelected;
    return ret ? true : false;
  }

  public isChecklistProductSelected(id: string): boolean {
    return this.inCheckListing
      && this.checklistProductItems
      && this.checklistProductItems.length > 0
      && this.checklistProductItems.filter(c => c.id === id).shift() ? true : false;
  }

  public isProductSelected(id: string): boolean {
    return !this.inCheckListing
      && this.selectedProduct
      && this.selectedProduct.id === id ? true : false;
  }

  public isSubProductSelected(id: string): boolean {
    return this.checklistProductItems
      && this.checklistProductItems.length > 0
      && this.checklistProductItems.filter(c => c.id === id).shift() ? true : false;
  }
  /* when selecting product in checklist state */
  public isSubProductChecklistSelected(id: string): boolean {
    return this.inCheckListing
      && this.checklistProductItems
      && this.checklistProductItems.length > 0
      && this.checklistProductItems.filter(c => c.id === id).shift() ? true : false;
  }
  /* when selecting product in checklist state
    we are matching the subproduct by using childid 
  */
  public isSubProductChecklistRelated(sub: any): boolean {
    return this.inCheckListing
      && this.checklistItems
      && this.checklistItems.length > 0
      && this.checklistItems.filter(c => {
        return c.checklist_product
          && c.checklist_product.product
          && (c.checklist_product.product.id === sub.id /* if the product is the same */
            || c.checklist_product.product._id === sub._id) /* if product has the same checklists */
      }).shift() ? true : false;
  }

  public fmtToSimpleItem(p: IProduct): ISimpleItem {
    return Object.assign({}, { value: p.id, label: p.product_name, _id: p._id });
  }

  public fmtSubToSimpleItem(p: IProduct): ISimpleItem {
    return Object.assign({}, { value: p.id, label: p.product_name, _id: p._id, });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.inCheckListing && changes.inCheckListing.currentValue) {
      this.inCheckListing = changes.inCheckListing.currentValue;
    }
  }

  ngAfterViewInit() {
    this.productPillsArr = this.contract.contract_products;
    this.cdRef.detectChanges();
  }

  public onAdd(): void {
    if (this.form.value && this.initInputProduct) {
      let payload: IContractProduct = this.fmtPayload(this.form.value);

      if (payload)
        this.store.dispatch(addContractProducts({ payload }));

      /* clear existing checklists */
      this.store.dispatch(removeSelectedProductAction());

      this.onResetForm();
    }
    if (!this.initInputProduct) this.initInputProduct = true;
  }

  public onSave(): void {
    if (this.form.value) {
      this.isEditProduct = !this.isEditProduct;
      const payload = this.fmtPayload(this.form.value);

      this.store.dispatch(updateContractProduct({ payload }));

      /* reload checklist so it will be shown when checklisting */
      this.store.dispatch(loadInspectionChecklistAction());
    }
  }

  private getName(name: any): any {
    if (typeof (name) === 'object') {
      return name.label && name.label.split('-')[0].trim() || '';
    }
    return name.split('-')[0].trim() || '';
  }

  private getId(obj: any): any {
    if (typeof (obj) === 'object') {
      return obj.value;
    }
    return null;
  }

  private fmtSubProducts(sp: IProduct[]): any {
    return sp && sp.map(sp => {
      const ret = _.pickBy({
        _id: sp._id,
        id: sp.id ? sp.id : this.getId(sp.product_name),
        product_name: this.getName(sp.product_name),
        qty: sp.qty,
        cost: sp.cost,
      }, _.identity);
      return ret;
    }) || [];
  }

  private fmtPayload(formValue: IProduct): any {
    const { id, product_name, qty, cost, sub_products } = formValue;

    const pid: string = this.getId(product_name);
    return {
      parent: _.pickBy({
        _id: id,
        id: pid ? pid : id,
        product_name: this.getName(product_name),
        qty, cost
      }, _.identity),
      children: Object.assign([], this.fmtSubProducts(sub_products)),
      contract: { id: this.contract.id, contract_name: this.contract.contract_name }
    };
  }

  public onEdit(product: IProduct): void {
    if (this.inCheckListing) return;
    /* assign selected item to form */
    const { _id, id, product_name, qty, cost, sub_products } = product;

    this.formSubProdsArr = null;
    this.initInputProduct = this.selectedProduct ? true : false;

    /* use contract product id here */
    this.form.controls['id'].patchValue(_id);
    /* we use an object for passing values to suggestion control */
    this.form.controls['product_name'].patchValue({ label: product_name, value: id });
    this.form.controls['qty'].patchValue(qty);
    this.form.controls['cost'].patchValue(cost);
    this.form.controls['sub_products'].patchValue(this.fmtSubProducts(sub_products));

    /* map/format subproducts */
    const subProducts = this.fmtSubProducts(sub_products);
    this.formSubProdsArr = this.form.get('sub_products') as FormArray;
    if (this.formSubProdsArr)
      this.formSubProdsArr.clear();
    subProducts && subProducts.forEach(subItem => {
      const item = this.createSubItem({
        _id: subItem._id,
        id: subItem.id,
        /* we use an object for passing values to suggestion control */
        product_name: { label: subItem.product_name, value: subItem.id },
        qty: subItem.qty,
        cost: subItem.cost
      });
      this.formSubProdsArr.push(item);
    });

    this.hasSubProducts = this.formSubProdsArr && this.formSubProdsArr.length > 0;
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
    /* add empty placehold product */
    const result = this.createSubItem({
      product_name: '',
      qty: this.form.get('qty').value,
      cost: 1,
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
            })
          /* remote product from the database */
          if (toRemove)
            this.store.dispatch(deleteContractProduct({ id: toRemove._id }));

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
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //remove item from form array
        const item = this.form.get('sub_products') as FormArray;
        item.removeAt(i);

        /* collect the contract product to be removed */
        let toRemove: IContractProduct;
        this.$contractProducts
          .pipe(takeUntil(this.$unsubscribe))
          .subscribe(p => {
            p && p.forEach(p => {
              p.sub_products.forEach(sp => {
                if (sp.id === product.id) {
                  const index = p.sub_products.indexOf(sp);
                  if (index > -1) {
                    p.sub_products.splice(index, 1);
                    toRemove = sp;
                  }
                  return;
                }
              });
            });
          })
        /* remote sub product from the database */
        if (toRemove) {
          this.store.dispatch(deleteContractProduct({ id: toRemove._id }));
          this.onResetForm();
        }
      }
    });
  }

  private fmtToChecklist(payload: ISimpleItem): void {
    delete Object.assign(payload, { ['id']: payload['value'] })['value'];
    delete payload.label;
  }

  public removeSelection(): void {
    // const pillArrContainer = document.querySelectorAll('.pill-container');
    // pillArrContainer && pillArrContainer.forEach((item) => {
    //   item.classList.remove("selected");
    // })
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

