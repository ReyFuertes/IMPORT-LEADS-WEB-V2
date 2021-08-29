import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IContract, IContractCategory, IContractProduct, IContractTerm } from 'src/app/modules/contracts/contract.model';
import { loadContractCategoryAction } from 'src/app/modules/contracts/store/actions/contract-category.action';
import { loadContractProductsAction } from 'src/app/modules/contracts/store/actions/contract-product.action';
import { getContractCategorySelector } from 'src/app/modules/contracts/store/selectors/contract-category.selector';
import { getAllContractProductsSelector } from 'src/app/modules/contracts/store/selectors/contracts.selector';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { loadContractsAction } from 'src/app/modules/contracts/store/actions/contracts.action';
import { getReportContractById } from '../../store/selectors/report.selector';
import { CONTRACTSROUTE } from 'src/app/shared/constants/routes';
import { LoaderService } from 'src/app/services/http-token-interceptor';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-contract-detail-report',
  templateUrl: './contract-detail-report.component.html',
  styleUrls: ['./contract-detail-report.component.scss']
})
export class ContractDetailReportComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public contract: IContract;
  public $contract: Observable<IContract>;
  public $contractProducts: Observable<IContractProduct[]>;
  public id: string;
  public svgPath: string = environment.svgPath;
  public $contractCategories: Observable<IContractCategory[]>;
  public dataSource: MatTableDataSource<IContractTerm[]>;
  public columnsToDisplay = ['term_name', 'term_description'];
  public isPrinting: boolean = false;
  public contractsRoute = CONTRACTSROUTE;
  public apiContractsImagePath: string = environment.apiContractsImagePath;

  constructor(public translateService: TranslateService, private loaderService: LoaderService, private cdRef: ChangeDetectorRef, private sanitizer: DomSanitizer, private store: Store<AppState>,
    private route: ActivatedRoute, private router: Router) {
    super();
    this.store.dispatch(loadContractsAction({}));

    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(loadContractProductsAction({ id: this.id }));

      this.$contract = this.store.pipe(select(getReportContractById(this.id)));
      this.$contract.subscribe(c => {
        if (c) {
          this.store.dispatch(loadContractCategoryAction({ id: c.id }));
        }
      });
    }
  }

  ngOnInit(): void {
    this.$contractCategories = this.store.pipe(select(getContractCategorySelector));
    this.$contractCategories.pipe(
      takeUntil(this.$unsubscribe))
      .subscribe((res: any) => {
        if (res?.length > 0) {
          this.dataSource = new MatTableDataSource<any>(res?.terms);
        }

        this.cdRef.detectChanges();
      });
    this.$contractProducts = this.store.pipe(select(getAllContractProductsSelector));
  }

  ngAfterViewInit(): void {
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public fmtCol(str: string): string {
    return str && str.replace(/_/g, ' ').toUpperCase();
  }

  public sanitizeHtml(html: any): any {
    /* remove br tags */
    let _html = html?.replace(/<br>/gi, "");
    _html = _html?.replace(/<br\s\/>/gi, "");
    _html = _html?.replace(/<br\/>/gi, "");
    _html = _html?.replace("/<p[^>]*><\\/p[^>]*>/", '');
    /* remove empty p tags */
    const parsedElement = _html?.replace("/<p[^>]*><\\/p[^>]*>/", '');

    return this.sanitizer.bypassSecurityTrustHtml(parsedElement || '');
  }

  public hasTerms(terms: IContractTerm[]): boolean {
    return terms?.length > 0 ? true : false;
  }
}
