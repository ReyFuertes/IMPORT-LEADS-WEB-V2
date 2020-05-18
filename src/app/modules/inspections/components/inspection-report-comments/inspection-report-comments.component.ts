import { Component, OnInit } from '@angular/core';

export interface Comment {
  itemNumber: number;
  product: string;
  picture: string;
  comment: string;
}

const ELEMENT_DATA: Comment[] = [
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
  selector: 'il-inspection-report-comments',
  templateUrl: './inspection-report-comments.component.html',
  styleUrls: ['./inspection-report-comments.component.scss']
})

export class InspectionReportCommentsComponent implements OnInit {

  public commentHeader: any[] = [
    { title: 'Total comments', value: '3' }
  ];

  public displayedColumns: string[] = ['itemNumber', 'product', 'picture', 'comment'];
  public dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() { }
}
