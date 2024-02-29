import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { ApiConstant } from 'src/app/shared/apiconstants';
import { ApiService } from 'src/app/services/api.services';
import { Subject, takeUntil } from 'rxjs';
import { DoughnutOptions, Options } from 'src/app/shared/interface';
import { ToastrService } from 'ngx-toastr';
import Chart from 'chart.js/auto';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  constructor(private chartsData: DashboardChartsData, private apiService: ApiService, private toastr: ToastrService) {
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
  cards = [
    { name: 'Packages', cnt: 0, img: 'assets/icons/packages_alt.svg' },
    { name: 'Exercises', cnt: 0, img: 'assets/icons/exercise_alt.svg' },
    { name: 'Templates', cnt: 0, img: 'assets/icons/layout_alt.png' }
  ]
  uniqueTags: any = [];
  recentExercises:any = [];
  recentPackages:any = [];
  recentTemplates:any = [];
  firstName;
  public Editor = ClassicEditorBuild;

  ngOnInit(): void {
    // this.initCharts();
    this.loader = true;
    this.fetchDetails()
    setTimeout(() => {
      this.loader = false;
    }, 2000)
  }

  initCharts(): void {
    const datesArray = ['Active', 'Published', 'Draft', 'Inactive'];
    const countsArray = [70, 20, 35, 55];
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
    new Chart('myChart', {
      type: 'bar',
      options: this.options,
      data: this.data
    });
  }

  fetchDetails() {
    let role = localStorage.getItem("TCuserRole");
    this.firstName = localStorage.getItem("TCuserfirstName")
    role = role=='tc' ? 'tc' : (role=='super_admin' ? 'super-admin':'' )
    let URL = environment?.apiUrl + `${role}/menu`; // here we have to change api based on whether role is admin or tc
    this.apiService.ExecutePost(URL, {}).subscribe((data: any) => {
      // this.wrongUser = false;
      console.log(data);
      this.cards[0].cnt = data?.data?.createdPackageCount;
      this.cards[1].cnt = data?.data?.createdExerciseCount;
      this.cards[2].cnt = data?.data?.createdTemplateCount;
      this.recentPackages = data?.data?.topFivePackageDto;
      this.recentExercises = data?.data?.topFiveExerciseDto;
      this.recentTemplates = data?.data?.topFiveTemplateDto;

    }, (err) => {
      // this.wrongUser = true;
      this.loader = false;
      console.log(err?.error)
      this.toastr.error(err?.error || err)

    })
  }

}
