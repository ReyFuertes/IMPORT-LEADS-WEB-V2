import { Component, OnInit } from '@angular/core';

export interface Summary {
  contactName: string;
  startDate: string;
  endDate: string;
}

const ELEMENT_DATA: Summary[] = [
  {
    contactName: 'PI SK19NL0806-1 Touch Dimmer Switch',
    startDate: '06.10.2019',
    endDate: '06.10.2019'
  },
  {
    contactName: 'ZS-4711 Watch Inspection',
    startDate: '18.10.2019',
    endDate: '18.11.2019'
  },
  {
    contactName: 'ZS-4827 Minimal Retro Watch Procuction',
    startDate: '22.10.2019',
    endDate: '22.11.2019'
  },
  {
    contactName: 'ZS-4711 Watch Inspection',
    startDate: '27.10.2019',
    endDate: '27.11.2019'
  },
  {
    contactName: 'ZS-4827 Minimal Retro Watch Procuction',
    startDate: '06.10.2019',
    endDate: '06.10.2019'
  }
];

@Component({
  selector: 'il-user-profile-summary',
  templateUrl: './user-profile-summary.component.html',
  styleUrls: ['./user-profile-summary.component.scss']
})
export class UserProfileSummaryComponent implements OnInit {

  public summaryHeader: any[] = [
    { title: 'Total contracts', value: '5' },
    { title: 'Total Inspections', value: '10' },
    { title: 'Total Value', value: '$8 956.54' },
  ];

  public displayedColumns: string[] = ['contactName', 'startDate', 'endDate'];
  public dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
