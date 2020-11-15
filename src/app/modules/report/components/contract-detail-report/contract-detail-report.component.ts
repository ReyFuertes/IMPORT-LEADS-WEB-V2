import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IContract, IContractCategory, IContractProduct, IContractTerm } from 'src/app/modules/contracts/contract.model';
import { loadContractCategoryAction } from 'src/app/modules/contracts/store/actions/contract-category.action';
import { loadContractProducts } from 'src/app/modules/contracts/store/actions/contract-product.action';
import { getContractCategorySelector } from 'src/app/modules/contracts/store/selectors/contract-category.selector';
import { getAllContractProductsSelector, getContractById } from 'src/app/modules/contracts/store/selectors/contracts.selector';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';
import { loadContractsAction } from 'src/app/modules/contracts/store/actions/contracts.action';
import { getReportContractById } from '../../store/selectors/report.selector';

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

  constructor(private sanitizer: DomSanitizer, private store: Store<AppState>, private route: ActivatedRoute) {
    super();
    this.store.dispatch(loadContractsAction({}));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(loadContractProducts({ id: this.id }));

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
      if (res && res.length > 0) {

        this.dataSource = new MatTableDataSource<any>(res?.terms);
      }
    });
  }

  public onDownload(): void {
    this.isPrinting = true;
    setTimeout(() => {
      var data = document.querySelector('.contract-detail-report-container');

      html2canvas(data).then(canvas => {
        // Few necessary setting options  
        var imgWidth = 208;
        var imgHeight = canvas.height * imgWidth / canvas.width;

        // const contentDataURL = canvas.toDataURL('image/jpeg')
        // let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        // var position = 0;
        // pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight)
        // pdf.save('MYPdf.pdf'); // Generated PDF   

        const imgData = canvas.toDataURL('image/png')

        var doc = new jsPDF('p', 'mm', "a4");
        var position = 0;

        var imgWidth = 210;
        var pageHeight = 320;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 30);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 70);
          heightLeft -= pageHeight;
        }
   
        doc.save('MYPdf.pdf'); // Generated PDF 

        this.isPrinting = false;
      });
    });
  }

  public fmtCol(str: string): string {
    return str && str.replace(/_/g, ' ').toUpperCase();
  }

  public sanitizeHtml(html: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
