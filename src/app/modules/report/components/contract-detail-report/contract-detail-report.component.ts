import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IContract, IContractCategory, IContractProduct, IContractTerm } from 'src/app/modules/contracts/contract.model';
import { loadContractCategoryAction } from 'src/app/modules/contracts/store/actions/contract-category.action';
import { loadContractProductsAction } from 'src/app/modules/contracts/store/actions/contract-product.action';
import { getContractCategorySelector } from 'src/app/modules/contracts/store/selectors/contract-category.selector';
import { getAllContractProductsSelector, getContractById } from 'src/app/modules/contracts/store/selectors/contracts.selector';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { loadContractsAction } from 'src/app/modules/contracts/store/actions/contracts.action';
import { getReportContractById } from '../../store/selectors/report.selector';
import * as html2pdf from 'html2pdf.js'
import { CONTRACTSROUTE } from 'src/app/shared/constants/routes';
import { LoaderService } from 'src/app/services/loader.interceptor';

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

  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef, private sanitizer: DomSanitizer, private store: Store<AppState>,
    private route: ActivatedRoute, private router: Router) {
    super();
    this.store.dispatch(loadContractsAction({}));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(loadContractProductsAction({ id: this.id }));

      this.$contract = this.store.pipe(select(getReportContractById(this.id)));
      this.$contract.subscribe(c => {
        if (c) {
          this.store.dispatch(loadContractCategoryAction({ id: c.id }));
        }
      });
      this.$contractProducts = this.store.pipe(select(getAllContractProductsSelector));
    }
  }

  ngAfterViewInit(): void {
    this.$contractCategories = this.store.pipe(select(getContractCategorySelector));
    this.$contractCategories.pipe(debounceTime(1000)).subscribe((res: any) => {
      if (res && res?.length > 0) {
        this.dataSource = new MatTableDataSource<any>(res?.terms);
      }
    });
  }

  public onExport(): void {
    this.isPrinting = true;
    this.loaderService.isLoading.next(true);

    setTimeout(() => {
      let element = document.querySelector('.contract-detail-report-container');
      let opt = {
        margin: 0.3,
        filename: `contract-detail-${new Date().getTime()}`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
        pagebreak: {
          avoid: ['tab-header'],
          // after: ['table'],
          mode: 'avoid-all',
          // avoid: ['tab-header', 'thead', 'th', 'tr', 'td', '.mat-row', 'img']
        }
      };

      /* remove br tags */
      element.innerHTML = element.innerHTML.replace(/<br>/gi, "");
      element.innerHTML = element.innerHTML.replace(/<br\s\/>/gi, "");
      element.innerHTML = element.innerHTML.replace(/<br\/>/gi, "");
      /* remove empty p tags */
      const parsedElement = element.innerHTML.replace("/<p[^>]*><\\/p[^>]*>/", '');

      html2pdf().set(opt).from(parsedElement).save();
    }, 500);

    setTimeout(() => {
      this.loaderService.isLoading.next(false);
      this.isPrinting = false;
      this.router.navigateByUrl(`${this.contractsRoute}/${this.id}/detail`);
    }, 1000);
  }

  public fmtCol(str: string): string {
    return str && str.replace(/_/g, ' ').toUpperCase();
  }

  public sanitizeHtml(html: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
