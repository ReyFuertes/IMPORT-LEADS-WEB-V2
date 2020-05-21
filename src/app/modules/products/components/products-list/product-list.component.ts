import { ISimpleItem, AddEditState } from './../../../../shared/generics/generic.model';
import { addProduct, deleteProduct, updateProduct } from './../../store/products.actions';
import { AppState } from './../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { IProduct } from './../../products.model';
import { IRelatedProduct } from '../../../venues/venues.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent extends GenericRowComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public dragStart: boolean = false;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public cols: string[] = ['product_name', 'parent'];

  @Input()
  public products: IProduct[];

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() { }

  public onUpdate(event: any): void {
    const { parent, child } = event;
    const payload = Object.assign({}, child, { parent: { id: parent } });
    this.store.dispatch(updateProduct({ item: payload }))
  }

  public get getDdItems(): ISimpleItem[] {
    return this.products.slice(0, 10).map(p => {
      return {
        value: p.id,
        label: p.product_name
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.products && changes.products.currentValue) {
      this.products = changes.products.currentValue;
    }
  }

  public colFunc(): void {
    alert('No implementation yet!');
  }

  public onDelete(item: IProduct): void {
    const { id } = item;
    if (id)
      this.store.dispatch(deleteProduct({ id }));
  }

  public onSave(item: any): void {
    setTimeout(() => {
      if (item && item.parent) {
        item.parent = Object.assign({}, {
          id: item.parent.value,
          product_name: item.parent.label
        })
      }
      if (item)
        this.store.dispatch(updateProduct({ item }));
    }, 100);
  }

  public dragStarted = (event: any) => this.dragStart = event;

  public getToolTip(product: IRelatedProduct[]): string {
    let tooltip = '';
    for (const entry of product) {
      tooltip = tooltip + entry.product_name + '\n';
    }
    return tooltip;
  }
}
