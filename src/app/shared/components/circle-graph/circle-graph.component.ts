import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'il-circle-graph',
  templateUrl: './circle-graph.component.html',
  styleUrls: ['./circle-graph.component.scss']
})
export class CircleGraphComponent implements OnInit {
  @Input()
  public graphData: any;
  public canvas: any;
  public ctx: any;
  public myChart: any = [];
  @ViewChild('myChart', {static: true}) canvasRef: ElementRef;

  constructor() { }

  ngOnInit() {
    this.loadChart();
  }

  private loadChart(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');

    const color0 = '#b23535';
    const gradients = [];
    const gradient = this.ctx.createLinearGradient(0, 0, 180, 180);
    gradient.addColorStop(0, color0);
    gradients.push(gradient);

    this.myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.graphData['dataConsume'], this.graphData['dataRemaining']],
          backgroundColor: gradients,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        cutoutPercentage: 85,
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }

}
