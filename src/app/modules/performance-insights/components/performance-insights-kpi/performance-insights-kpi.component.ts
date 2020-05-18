import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'il-performance-insights-kpi',
  templateUrl: './performance-insights-kpi.component.html',
  styleUrls: ['./performance-insights-kpi.component.scss']
})
export class PerformanceInsightsKpiComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public dataConsume: number = 25;
  public dataRemaining: number = 75;
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

    const color0 = '#22cc96';
    const gradients = [];
    const gradient = this.ctx.createLinearGradient(0, 0, 180, 180);
    gradient.addColorStop(0, color0);
    gradients.push(gradient);

    this.myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.dataConsume, this.dataRemaining],
          backgroundColor: gradients,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        cutoutPercentage: 90,
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }
}
