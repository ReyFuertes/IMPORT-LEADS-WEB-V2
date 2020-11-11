import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IContract, IContractProduct } from 'src/app/modules/contracts/contract.model';
import { loadContractProducts } from 'src/app/modules/contracts/store/actions/contract-product.action';
import { loadContractsAction } from 'src/app/modules/contracts/store/actions/contracts.action';
import { getAllContractProductsSelector, getContractById } from 'src/app/modules/contracts/store/selectors/contracts.selector';
import { IProduct } from 'src/app/modules/products/products.model';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { getReportContractById } from '../../store/selectors/report.select';

@Component({
  selector: 'il-contract-detail-report',
  templateUrl: './contract-detail-report.component.html',
  styleUrls: ['./contract-detail-report.component.scss']
})
export class ContractDetailReportComponent implements OnInit, AfterViewInit {
  public contract: IContract;
  public $contract: Observable<IContract>;
  public $contractProducts: Observable<IContractProduct[]>;
  public id: string;
  public svgPath: string = environment.svgPath;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if(this.id) {
      this.store.dispatch(loadContractProducts({ id: this.id }));
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.$contract = this.store.pipe(select(getReportContractById(this.id)));

      this.$contractProducts = this.store.pipe(select(getAllContractProductsSelector));
    }
  }

  ngAfterViewInit(): void {

  }
}
