import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { saveUserPermissionAction } from '../../store/view-permission.actions';

@Component({
  selector: 'il-view-permission-page',
  templateUrl: './view-permission-page.component.html',
  styleUrls: ['./view-permission-page.component.scss']
})
export class ViewPermissionPageComponent implements OnInit {
  public sourceProducts: any[] = [
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1002",
      "code": "zz21cz3c1",
      "name": "Blue Band",
      "description": "Product Description",
      "image": "blue-band.jpg",
      "price": 79,
      "category": "Fitness",
      "quantity": 2,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    }
  ]
  public targetProducts: any[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.targetProducts = [];
  }

  public handleOnMoveToTarget(event: any[]): void {
    if (event?.shift()) {
      const payload = {

      };
      this.store.dispatch(saveUserPermissionAction({ payload }));
    }
  }

  public handleOnMoveToSource(event: any): void {
    console.log(event);
  }
}
