import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { IContract } from '../../contract.model';

@Component({
  selector: 'il-contract-card-milestone',
  templateUrl: './contract-card-milestone.component.html',
  styleUrls: ['./contract-card-milestone.component.scss']
})

export class ContractCardMilestoneComponent implements OnInit {

  @Input()
  public contract: IContract;

  public pointOfDates: string[] = [];
  public mileStoneDates: string[] = [];
  constructor() { }

  public getTooltip(date: any, i: number): any {
    return this.mileStoneDates.includes(date) ? date + ' : ' + (i === 0 ? 'Start Date' : ((this.pointOfDates.length - 1) === i ? 'Delivery Date' : 'Milestone Name')) : ''
  }

  ngOnInit() {
    this.contract = this.contract[0];
    this.mileStoneDates = [
      moment(this.contract.start_date).format('MM/DD/YYYY'),
      moment(this.contract.delivery_date).format('MM/DD/YYYY')
    ];

    const from = moment(this.contract.start_date);
    const to = moment(this.contract.delivery_date);

    var currDate = moment(from).startOf('day');
    var lastDate = moment(to).startOf('day');

    for (let index = 0; index <= Math.abs(from.diff(to, 'days')); index++) {
      this.pointOfDates.push(currDate.clone().add(index, 'days').format('MM/DD/YYYY'));
    }
  }

  public getLen(len: number): number[] {
    return new Array(len);
  }
}
