import { loadContractCategory } from './../store/actions/contract-category.action';
import { loadTags } from './../../tags/store/actions/tags.actions';
import { ContractProductsState } from './../store/reducers/contract-products.reducer';
import { loadContracts } from './../store/actions/contracts.action';
import { AppState } from './../../../store/app.reducer';
import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadVenues } from '../../venues/store/venues.action';
import { loadProducts } from '../../products/store/products.actions';

@Component({
  selector: 'il-contracts-container',
  templateUrl: './contracts-container.component.html',
  styleUrls: ['./contracts-container.component.scss']
})

export class ContractsContainerComponent extends GenericContainer implements OnInit {
  constructor(private productStore: Store<ContractProductsState>, private store: Store<AppState>) {
    super();
    this.store.dispatch(loadContracts(null));
    this.store.dispatch(loadProducts());
    this.store.dispatch(loadTags());
  }
}
