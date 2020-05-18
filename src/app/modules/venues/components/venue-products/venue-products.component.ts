import { AppState } from './../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ISimpleItem } from '../../../../shared/generics/generic.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { IVenue, IRelatedProduct } from '../../venues.models';

@Component({
  selector: 'il-venue-products',
  templateUrl: './venue-products.component.html',
  styleUrls: ['./venue-products.component.scss']
})

export class VenueProductsComponent extends GenericRowComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: IVenue[];
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;
  public rates = new Array(5);
  @Input()
  public isProduct: boolean;

  public ctColsRelatedProduct: Array<{ label: string, width?: string | number }> = [
    {
      label: '',
      width: 30
    },
    {
      label: 'Configured products',
      width: 35
    },
    {
      label: 'Avg. Price',
      width: 10
    },
    {
      label: 'Avg. pass/fail',
      width: 10
    },
    {
      label: 'Qnt. of items',
      width: 10
    }
  ];

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(private store: Store<AppState>) {
    super();

  }

  ngOnInit() {
    console.log(this.items);
  }

  public dragStarted(event: any) {
    this.dragStart = event;
  }

  public getToolTip(product: IRelatedProduct[]): string {
    let tooltip = '';
    for (const entry of product) {
      tooltip = tooltip + entry.product_name + '\n';
    }
    return tooltip;
  }
}
