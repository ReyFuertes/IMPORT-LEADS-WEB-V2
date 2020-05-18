import { Component, OnInit } from '@angular/core';
import { InsightVenue } from '../../performance-insights.models';

@Component({
  selector: 'il-performance-insights-overview-page',
  templateUrl: './performance-insights-overview-page.component.html',
  styleUrls: ['./performance-insights-overview-page.component.scss']
})
export class PerformanceInsightsOverviewPageComponent implements OnInit {

  public insightProducts: InsightVenue[] = [
    {
      id: 1,
      venue: 'Canhui toys limited',
      product: {label: 'Beamer'},
      passRate: 49,
      failureRate: 51,
      materials: 4,
      packaging: 4,
      appearance: 42,
      hideCol: '',
      techMes: 6,
      relatedProducts: [
        {
          label: 'Lasergun > Green'
        },
        {
          label: 'Lasergun > Orange'
        },
        {
          label: 'Tin box Retangular - 320*240*50mm'
        }
      ]
    },
    {
      id: 1,
      venue: 'Winyea small gun > Blue',
      product: {label: 'Winyea small gun > Yellow'},
      passRate: 95,
      failureRate: 5,
      materials: 0,
      packaging: 2,
      appearance: 0,
      hideCol: '',
      techMes: 0,
      relatedProducts: [
        {
          label: 'Winyea small gun > Green'
        },
        {
          label: 'Winyea small gun > Yellow'
        },
        {
          label: 'Winyea standard guns > camo gray'
        }
      ]
    },
    {
      id: 1,
      venue: 'Landy Jewerlry Co.,Ltd',
      product: {label: 'Bead and matte black volcanic'},
      passRate: 70,
      failureRate: 35,
      materials: 2,
      packaging: 3,
      appearance: 42,
      hideCol: '',
      techMes: 6,
      relatedProducts: [
        {
          label: 'Rosewood and matte black volcanic'
        },
        {
          label: 'Sandal wood and matte black volcanic'
        },
        {
          label: 'Bead and matte black volcanic'
        }
      ]
    }
  ];
  public ctColsInsightVenue: Array<{ label: string, width?: string | number, icon?: string }> = [
    {
      label: 'Venue',
      width: 15,
    },
    {
      label: 'Product name',
      width: 20,
      icon: 'move-icon-blue.svg'
    },
    {
      label: 'Pass rate',
      width: 10,
    },
    {
      label: 'Failure rate',
      width: 10,
    },
    {
      label: 'Materials',
      width: 10,
    },
    {
      label: 'Packaging',
      width: 10,
      icon: 'hide-icon-blue.svg'
    },
    {
      label: 'Appearance',
      width: 10,
    },
    {
      label: '',
      width: 3,
      icon: 'show-icon-gray.svg'
    },
    {
      label: 'Tech. mes.',
      width: 12
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
