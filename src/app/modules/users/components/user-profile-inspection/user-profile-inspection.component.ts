import { Component, OnInit } from '@angular/core';

export interface Summary {
  templateName: string;
  date: string;
  duration: number;
  itemsInspected: number;
}

const ELEMENT_DATA: Summary[] = [
  {
    templateName: 'Inspection template name 1',
    date: '06.10.2019',
    duration: 2,
    itemsInspected: 49
  },
  {
    templateName: 'Inspection template name 2',
    date: '06.10.2019',
    duration: 2,
    itemsInspected: 49
  },
  {
    templateName: 'Inspection template name 3',
    date: '06.10.2019',
    duration: 2,
    itemsInspected: 49
  },
  {
    templateName: 'Inspection template name 4',
    date: '06.10.2019',
    duration: 2,
    itemsInspected: 49
  },
  {
    templateName: 'Inspection template name 5',
    date: '06.10.2019',
    duration: 2,
    itemsInspected: 49
  }
  ,
  {
    templateName: 'Inspection template name 6',
    date: '06.10.2019',
    duration: 2,
    itemsInspected: 49
  }
  ,
  {
    templateName: 'Inspection template name 7',
    date: '06.10.2019',
    duration: 2,
    itemsInspected: 49
  }
  ,
  {
    templateName: 'Inspection template name 8',
    date: '06.10.2019',
    duration: 2,
    itemsInspected: 49
  }
  ,
  {
    templateName: 'Inspection template name 9',
    date: '06.10.2019',
    duration: 2,
    itemsInspected: 49
  }
  ,
  {
    templateName: 'Inspection template name 10',
    date: '06.10.2019',
    duration: 2,
    itemsInspected: 49
  }
];
@Component({
  selector: 'il-user-profile-inspection',
  templateUrl: './user-profile-inspection.component.html',
  styleUrls: ['./user-profile-inspection.component.scss']
})
export class UserProfileInspectionComponent implements OnInit {

  public displayedColumns: string[] = ['templateName', 'date', 'duration' , 'itemsInspected'];
  public dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
