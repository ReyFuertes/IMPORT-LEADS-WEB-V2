import { loadChecklist } from './../../../inspections/store/inspection.action';
import { getHighlightChecklist, getContractChecklistSelector } from './../../store/selectors/contract-checklist.selector';
import { highlightChecklist, selectTerm, removeSelectedTerm } from './../../store/actions/contract-checklist.action';
import { getPreSelectedProductsSelector } from './../../store/selectors/contract-product-selector';
import { getContractCategorySelector, getCategoryTermsSelector } from './../../store/selectors/contract-category.selector';
import { getProductsSelector } from './../../../products/store/products.selector';
import { IProduct } from './../../../products/products.model';
import { getAllContractProductsSelector } from './../../store/selectors/contracts.selector';
import { addContractProducts, deleteContractProduct, updateContractProduct, preSelectProducts, removePreSelectProduct } from './../../store/actions/contract-product.action';
import { AppState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { PillState, IContract, IContractProduct, IContractChecklist, IContractChecklistItem, IContractTerm } from './../../contract.model';
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

@Component({
  selector: 'il-contract-detail-products',
  templateUrl: './contract-detail-products.component.html',
  styleUrls: ['./contract-detail-products.component.scss']
})

export class ContractDetailProductsComponent implements OnInit, AfterViewInit, OnChanges {
  private destroy$ = new Subject();
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
  public selectedProducts: IProduct[] = [];
  public $contractProducts: Observable<IContractProduct[]>;
  public $products: Observable<IProduct[]>;
  public preSelectedProducts: IContractProduct[] = [];
  public $checklistProducts: Observable<IContractProduct[]>;
  public preSelectedCheckItems: IContractChecklistItem[] = [];
  public selCategoryTerms: IContractTerm[] = [];

  @Input()
  public inCheckListing: boolean = false;
  @Input()
  public contract: IContract;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
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
      .pipe(takeUntil(this.destroy$))
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

    /* get selected terms */
    this.store.pipe(select(getCategoryTermsSelector),
      tap(terms => {
        if (terms && terms.length > 0)
          this.selCategoryTerms = terms;
      }))
      .subscribe();
  }

  ngOnDestroy() { }

  ngOnInit() {
    this.$contractProducts = this.store.pipe(select(getAllContractProductsSelector));
    this.$products = this.store.pipe(select(getProductsSelector));
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

    /* selected products */
    this.store.pipe(select(getPreSelectedProductsSelector),
      tap(pp => {
        if (pp.selectedProducts)
          this.preSelectedProducts = pp.selectedProducts;
        else
          this.preSelectedProducts = []
      })).subscribe();

    /* get all checklist so we can highlight green */
    this.store.pipe(select(getContractChecklistSelector))
      .subscribe(res => {
        this.preSelectedCheckItems = res;
      });
  }

  public preSelectChange(payload: ISimpleItem | any, isPreselected?: boolean): void {
    this.fmtToChecklist(payload);

    /* preselect terms base on product selection */
    const items: IContractChecklistItem[] = this.preSelectedCheckItems
      .filter(i => i.checklist_product.id === payload._id);
    if (!isPreselected)
      this.store.dispatch(selectTerm({ items }));

    const spMatch = this.preSelectedProducts
      && this.preSelectedProducts.length > 0
      && this.preSelectedProducts.filter(p => p.id === payload.id).shift();
    if (!spMatch) {
      this.preSelectedProducts.push(payload);
      this.store.dispatch(preSelectProducts({ payload: this.preSelectedProducts }));

      /* add notification if the product has already a checklist, yes = to override, no remove selection */
      this.overrideProduct(isPreselected, payload);
    } else {
      this.store.dispatch(preSelectProducts({ payload: this.preSelectedProducts }));
    }

    /* if not checklisting, then product is greater that 1, delect the previous product */
    if (!this.inCheckListing) {
      this.fmtToChecklist(payload);
      _.remove(this.preSelectedProducts,
        (p: { id: string, _id: string }) => p.id !== payload._id);

      this.store.dispatch(preSelectProducts({ payload: this.preSelectedProducts }));
      return;
    }
  }

  private overrideProduct(isPreselected: boolean, payload: ISimpleItem): void {
    const hasSource = this.preSelectedProducts && this.preSelectedProducts.length > 1;
    const inChecklist = this.preSelectedCheckItems.filter(c => c.checklist_product.id === payload._id).shift();
    if (hasSource && !isPreselected && this.inCheckListing && inChecklist) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '410px',
        data: { action: 1 }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          /* remove preselected product when override cancel */
          this.fmtToChecklist(payload);
          this.store.dispatch(removePreSelectProduct({ payload }));
        }
      });
    }
  }

  public hasChecklist(id: string): boolean {
    let preSelected = this.preSelectedCheckItems
      .filter(c => c.checklist_product && c.checklist_product.id === id).shift();
    const hasTerms = this.selCategoryTerms && this.selCategoryTerms.length > 0;

    if (!hasTerms) {
      //preSelected = null;
    }

    const ret = this.preSelectedCheckItems &&
      this.inCheckListing &&
      preSelected
    // || (hasTerms && this.inCheckListing && this.preSelectedCheckItems)

    return ret ? true : false;
  }

  public isProductSelected(id: string): boolean {
    return this.preSelectedProducts
      && this.preSelectedProducts.length > 0
      && this.preSelectedProducts.filter(c => c.id === id).shift() ? true : false;
  }

  public isSubProductSelected(id: string): boolean {
    return this.preSelectedProducts
      && this.preSelectedProducts.length > 0
      && this.preSelectedProducts.filter(c => c.sub_products && c.sub_products.filter(sp => sp._id === id)).shift() ? true : false;
  }

  public fmtToSimpleItem(p: IProduct): ISimpleItem {
    return { value: p.id, label: p.product_name, _id: p._id }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.inCheckListing && changes.inCheckListing.currentValue) {
      this.inCheckListing = changes.inCheckListing.currentValue;
    }
  }

  public subProductsArr = () => this.form.get('sub_products') as FormArray;

  ngAfterViewInit() {
    this.productPillsArr = this.contract.contract_products;
    this.cdRef.detectChanges();
  }

  public onAdd(): void {
    if (this.form.value && this.initInputProduct) {
      let payload: IContractProduct = this.fmtPayload(this.form.value);
      if (payload)
        this.store.dispatch(addContractProducts({ payload }));

      this.onResetForm();
    }
    if (!this.initInputProduct) this.initInputProduct = true;
  }

  public onSave(): void {
    if (this.form.value) {
      this.isEditProduct = !this.isEditProduct;
      const payload = this.fmtPayload(this.form.value);

      this.store.dispatch(updateContractProduct({ payload }));
      this.onResetForm();

      /* reload checklist so it will be shown when checklisting */
      this.store.dispatch(loadChecklist());
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
    return sp.map(sp => {
      const ret = _.pickBy({
        _id: sp._id,
        id: sp.id ? sp.id : this.getId(sp.product_name),
        product_name: this.getName(sp.product_name),
        qty: sp.qty,
        cost: sp.cost
      }, _.identity);
      return ret;
    })
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
    if (!product) return;

    /* assign selected item to form */
    const { _id, id, product_name, qty, cost, sub_products } = product;
    this.form.reset();
    this.formSubProdsArr = null;
    this.initInputProduct = true;

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
    if (this.formSubProdsArr) this.formSubProdsArr.clear();

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
    this.isEditProduct = true;
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
      data: {
        action: 0
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let toRemove: IContractProduct;
        this.$contractProducts.subscribe(p => {
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
        this.$contractProducts.subscribe(p => {
          p.forEach(p => {
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

  public deSelectChange(payload: ISimpleItem): void {
    /* remove selected term of a product/s */
    interval(100).pipe(take(1)).subscribe(() => {
      this.store.dispatch(removeSelectedTerm({ id: payload._id }));
    })

    const match = this.preSelectedProducts &&
      this.preSelectedProducts.filter(cp => cp.id === payload.value).shift()
    if (match) {
      const index: number = this.preSelectedProducts.indexOf(match);
      if (index !== -1) {
        this.preSelectedProducts.splice(index, 1);
        this.store.dispatch(preSelectProducts({ payload: this.preSelectedProducts }));
      }
    }
    this.onResetForm()
  };

  private fmtToChecklist(payload: ISimpleItem): void {
    delete Object.assign(payload, { ['id']: payload['value'] })['value'];
    delete payload.label;
  }

  public removeSelection(): void {
    const pillArrContainer = document.querySelectorAll('.pill-container');
    pillArrContainer && pillArrContainer.forEach((item) => {
      item.classList.remove("selected");
    })
  }

  public get isNavOpenAndEdit(): boolean {
    return this.inCheckListing && this.isEditProduct;
  }

  private onResetForm(): void {
    this.form.reset();
    this.hasSubProducts = false;
    this.isEditProduct = false;
    this.initInputProduct = false;

    if (this.formSubProdsArr) this.formSubProdsArr.clear();
  }

  public createItem = (item: ISimpleItem): FormGroup => this.fb.group(item);

  public createSubItem = (item: IProduct): FormGroup => this.fb.group(item);

  public onRemove(id: string): void {
    const i = this.productPillsArr.findIndex(x => x.id === id);
    this.productPillsArr.splice(i);
  }
}

