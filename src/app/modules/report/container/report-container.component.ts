import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { loadContractsAction } from '../../contracts/store/actions/contracts.action';

@Component({
  selector: 'il-report-container',
  templateUrl: './report-container.component.html',
  styleUrls: ['./report-container.component.scss']
})
export class ReportContainerComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    
  }

  ngOnInit(): void { }
}
