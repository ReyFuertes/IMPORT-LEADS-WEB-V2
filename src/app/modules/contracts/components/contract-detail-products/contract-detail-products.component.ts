import { getContractCategorySelector } from './../../store/selectors/contract-category.selector';
import { getProductsSelector } from './../../../products/store/products.selector';
import { IProduct } from './../../../products/products.model';
import { getAllContractProductsSelector } from './../../store/selectors/contracts.selector';
import { addContractProducts, deleteContractProduct, updateContractProduct, setChecklistProduct } from './../../store/actions/contract-products.action';
import { AppState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { PillState, IContract, IContractProduct } from './../../contract.model';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { take, takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';

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
  public checklistOfProducts: IContractProduct[] = [];
  public $checklistProducts: Observable<IContractProduct[]>;

  @Input()
  public inCheckListing: boolean = false;
  @Input()
  public contract: IContract;
  @Output()
  public checklistProductsEmitter = new EventEmitter<IProduct[]>();

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
    this.form.get('sub_products')
      .valueChanges
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

    /* get pre selected checklist products */
    this.store.pipe(select(getContractCategorySelector)).subscribe(res => {
      this.checklistOfProducts.concat(res);
      console.log(this.checklistOfProducts);
    })
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
    })
  }

  public isProductSelected(id: string): boolean {
    return this.checklistOfProducts.filter(c => c.id === id).shift() ? true : false;
  }

  public fmtToSimpleItem(p: IProduct): ISimpleItem {
    return {
      value: p.id,
      label: p.product_name
    }
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

    /* emit the selected product/s */
    if (!this.selectedProducts.includes(product)) {
      this.selectedProducts.push(product);
    }
    this.checklistProductsEmitter.emit(this.selectedProducts);

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
    const dialogRef = this.dialog.open(ConfirmationComponent, { width: '410px' });
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
    const dialogRef = this.dialog.open(ConfirmationComponent, { width: '410px' });
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
    const match = this.checklistOfProducts.filter(cp => cp.id === payload.value).shift()
    if(match) {
      const index: number = this.checklistOfProducts.indexOf(match);
      if (index !== -1) {
        this.checklistOfProducts.splice(index, 1);
        this.store.dispatch(setChecklistProduct({ payload: this.checklistOfProducts }));
      }
    }
    this.onResetForm()
  };

  public preSelectChange(payload: ISimpleItem): void {
    const match = this.checklistOfProducts.filter(cp => cp.id === payload.value).shift();
    if (!match) {
      this.checklistOfProducts.push({ id: payload.value });
      this.store.dispatch(setChecklistProduct({ payload: this.checklistOfProducts }));
    }
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

