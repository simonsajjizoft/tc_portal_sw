import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { ApiConstant } from 'src/app/shared/apiconstants';
import { ApiService } from 'src/app/services/api.services';
import { Subject, takeUntil } from 'rxjs';
import { DoughnutOptions, Options } from 'src/app/shared/interface';
import { ToastrService } from 'ngx-toastr';
import Chart  from 'chart.js/auto';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  constructor(private chartsData: DashboardChartsData, private apiService: ApiService, private toastr:ToastrService) {
  }
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  colors = {
    label: 'My dataset',
    borderColor: 'aliceblue',
    pointHoverBackgroundColor: '#fff',
  }
  labels: string[];
  data;
  options = {
    plugins: {
    legend: {
            display: false
    }
    },
    scales: {
            x: {
                    min: 0,
                    max: 8,
                    grid: {
                            display: false
                    },
            },
            y: {
                    display: false,
                    grid: {
                            display: false
                    },
            }
    },
    elements: {
            line: {
                    tension: 0.3
            }
    }
};;
  chartOptions = {
    plugins: {
    legend: {
            display: false
    }
    },
    scales: {
            x: {
                    min: 0,
                    max: 8,
                    grid: {
                            display: false
                    },
            },
            y: {
                    display: false,
                    grid: {
                            display: false
                    },
            }
    },
    elements: {
            line: {
                    tension: 0.3
            }
    }
  };;
  loader;
  blogs;
  careers;
  uniqueTags:any = [];
  public Editor = ClassicEditorBuild;

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    const datesArray = ['Active','Published','Draft','Inactive'];
    const countsArray = [70,20,35,55];
    this.data = {
      labels: [...datesArray],
      datasets: [{
        label: '',
        data: [
          ...countsArray
        ],
        backgroundColor: [
          '#f5d0d9',
          '#eb217c',
          '#d9c3eb',
          '#d9dbde',
    
        ],
        borderColor: [
          'rgb(7, 19, 38,0.01)',
          'rgb(7, 19, 38,0.01)',
          'rgb(7, 19, 38,0.01)',
          '#d9dbde',
     
        ],
        borderWidth: 6,
        borderRadius: 18,
        borderSkipped: false,
      },
      {
        type: 'line',
        label: '',
        data: [...countsArray],
        borderColor: [
          '#ffbadb',
          '#ffbadb',
          '#ffbadb',
        
        ],
        borderWidth: 2,
      }]
    };
    // const ctx = document.getElementById('myChart');
    new Chart('myChart', {
      type:'bar',
      options: this.options,
      data: this.data
    });
  }

}
