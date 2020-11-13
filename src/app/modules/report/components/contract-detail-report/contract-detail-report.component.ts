import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IContract, IContractCategory, IContractProduct, IContractTerm } from 'src/app/modules/contracts/contract.model';
import { loadContractCategoryAction } from 'src/app/modules/contracts/store/actions/contract-category.action';
import { loadContractProducts } from 'src/app/modules/contracts/store/actions/contract-product.action';
import { getContractCategorySelector } from 'src/app/modules/contracts/store/selectors/contract-category.selector';
import { getAllContractProductsSelector, getContractById } from 'src/app/modules/contracts/store/selectors/contracts.selector';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { getReportContractById } from '../../store/selectors/report.select';
// import { jsPDF } from 'jspdf'
// import html2canvas from 'html2canvas'; 

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

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    super();
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(loadContractProducts({ id: this.id }));
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.$contract = this.store.pipe(select(getReportContractById(this.id)));

      this.$contractProducts = this.store.pipe(select(getAllContractProductsSelector));

      this.$contract && this.$contract
        .pipe(takeUntil(this.$unsubscribe))
        .subscribe(c => {
          if (c) {
            /* get category by contract id */
            this.store.dispatch(loadContractCategoryAction({ id: c.id }));
          }
        });
    }
  }

  ngAfterViewInit(): void {
    this.$contractCategories = this.store.pipe(select(getContractCategorySelector));
    this.$contractCategories.subscribe((res: any) => {
      if (res && res.length > 0) {
        this.dataSource = new MatTableDataSource<any>(res?.terms);
      }
    })
  }

  public print(): void {
    var data = document.getElementById('content');  
    // html2canvas(data).then(canvas => {  
    //     // Few necessary setting options  
    //     var imgWidth = 208;   
    //     var pageHeight = 295;    
    //     var imgHeight = canvas.height * imgWidth / canvas.width;  
    //     var heightLeft = imgHeight;  

    //     const contentDataURL = canvas.toDataURL('image/png')  
    //     let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    //     var position = 0;  
    //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    //     pdf.save('MYPdf.pdf'); // Generated PDF   
    // });  
  }
  
  public fmtCol(str: string): string {
    return str && str.replace(/_/g, ' ').toUpperCase();
  }
}
