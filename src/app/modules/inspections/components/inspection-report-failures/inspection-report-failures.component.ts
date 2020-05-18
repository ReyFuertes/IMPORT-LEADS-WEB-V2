import { Component, OnInit } from '@angular/core';

export interface Failure {
  itemNumber: number;
  product: string;
  picture: string;
  comment: string;
}

const ELEMENT_DATA: Failure[] = [
  {
    itemNumber: 2,
    product: 'Lazergun > Green',
    picture: 'https://dummyimage.com/200x150/ccc/ccc.png',
    comment: 'is not sandal one, is different model from different customer'
  },
  {
    itemNumber: 4,
    product: 'Lazergun > Blue',
    picture: 'https://dummyimage.com/200x150/ccc/ccc.png',
    comment: 'Missing 2 beads on bracelets'
  },
  {
    itemNumber: 5,
    product: 'Lazergun > Orange',
    picture: 'https://dummyimage.com/200x150/ccc/ccc.png',
    comment: 'Not rosewood but walnut wood'
  },
  {
    itemNumber: 8,
    product: 'Lazergun > Yellow',
    picture: 'https://dummyimage.com/200x150/ccc/ccc.png',
    comment: 'broken keyboard'
  }
];

@Component({
  selector: 'il-inspection-report-failures',
  templateUrl: './inspection-report-failures.component.html',
  styleUrls: ['./inspection-report-failures.component.scss']
})

export class InspectionReportFailuresComponent implements OnInit {

  public failureHeader: any[] = [
    { title: 'Total failues', value: '4' }
  ];

  public displayedColumns: string[] = ['itemNumber', 'product', 'picture', 'comment'];
  public dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() { }
}
