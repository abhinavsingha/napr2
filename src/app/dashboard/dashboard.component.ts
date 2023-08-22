import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'node_modules/chart.js';
import * as $ from 'jquery';
import { ApiserviceService } from '../services/apiCall/apiservice.service';
import { ConstantsService } from '../services/constant/constants.service';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: any[] = [];
  detailData: any;
  naprUserDetail: any;
  totalForms: any;

  constructor(
    private apiService: ApiserviceService,
    private cons: ConstantsService,
    private common: CommonService) {

  }
  ngOnInit(): void {
    this.naprUserDetail = JSON.parse(localStorage.getItem('naprUserDetail') || '');
    this.getDashboardData();
    $('.count').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 2000,
        easing: 'swing',
        step: function (now: any) {
          $(this).text(Math.ceil(now));
        }
      });
    });
    // this.ngAfterViewInit();
  }




  getDashboardData() {
    this.apiService.getApi(this.cons.api.dashboardApiUrl).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        this.detailData = result;

        console.log(JSON.stringify(this.detailData));
        this.chartData();
        if (this.naprUserDetail['response'].userType == 'AD') {
          //  this.CompleteForms = this.detailData['response']['fromCountAdmin'][1][1];
          ///  this.RejectedForms = this.detailData['response']['fromCountAdmin'][2][1];
          // this.newForms = this.detailData['response']['fromCountAdmin'][3][1];
          this.totalForms = Number(this.detailData['response'][0].adminCount[0]['ap']) +
            Number(this.detailData['response'][0].adminCount[0]['ib']) +
            Number(this.detailData['response'][0].adminCount[0]['rt']);
        }
        else {
          $('#approvedAmount').hide();
          // this.CompleteForms = this.detailData['response']['fromCountAdmin'][1][1];
          // this.RejectedForms = this.detailData['response']['fromCountAdmin'][2][1];
          // this.newForms = this.detailData['response']['fromCountAdmin'][3][1];
          this.totalForms = Number(this.detailData['response'][0].staffCount[0]['ap']) +
            Number(this.detailData['response'][0].staffCount[0]['ib']) +
            Number(this.detailData['response'][0].staffCount[0]['rt']);
          // this.TotalSociety = this.dash['response']['commanTotalSociety'];
          // this.totaluser = this.dash['response']['commanTotalUserCount'];
        }
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }


  //ngAfterViewInit(): void {

  chartData() {
    Chart.register(...registerables);
    let dataSet;
    if (this.naprUserDetail['response'].userType == 'AD') {
      dataSet = [this.detailData.response[0].commanTotalUserCount,
      this.detailData['response'][0].adminCount[0]['ib'],
      Number(this.detailData['response'][0].adminCount[0]['ap']) +
      Number(this.detailData['response'][0].adminCount[0]['ib']) +
      Number(this.detailData['response'][0].adminCount[0]['rt']), this.detailData['response'][0].adminCount[0]['ap'],
      this.detailData['response'][0].adminCount[0]['rt'], this.detailData.response[0].commanTotalSociety, 0]
    }
    else {

      dataSet = [this.detailData.response[0].commanTotalUserCount,
      this.detailData['response'][0].staffCount[0]['ib'],
      Number(this.detailData['response'][0].staffCount[0]['ap']) +
      Number(this.detailData['response'][0].staffCount[0]['ib']) +
      Number(this.detailData['response'][0].staffCount[0]['rt']), this.detailData['response'][0].adminCount[0]['ap'],
      this.detailData['response'][0].staffCount[0]['rt'], this.detailData.response[0].commanTotalSociety, 0]
    }

    const data = {
      labels: ['Total Users', 'New Forms', 'Total Forms', 'Completed Forms', 'Rejected Forms', 'Total Society', 'Total Manager'],
      datasets: [{
        data: dataSet,
        backgroundColor: [
          '#1cc88a',
          '#4e73df',
          '#36b9cc',
          '#f6c23e',
          '#858796',
          '#e74a3b',
          '#008081',
          'rgb(248, 108, 107)',
        ],
        label: 'NAPR'

      },
      ]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          display: true
        }
      },
      legends: {
        display: false
      }
    }
    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: options
    }
    const chartItem: ChartItem = document.getElementById('my-chart') as ChartItem
    new Chart(chartItem, config)



    const data2 = {
      labels: ['Total Users', 'New Forms', 'Total Forms', 'Completed Forms', 'Rejected Forms', 'Total Society', 'Total Manager'],
      datasets: [{
        data: dataSet,
        backgroundColor: [
          '#1cc88a',
          '#4e73df',
          '#36b9cc',
          '#f6c23e',
          '#858796',
          '#e74a3b',
          '#008081',
          'rgb(248, 108, 107)',
        ],
        fill: true,
      }]
    };
    const options2 = {
      scales: {
        y: {
          beginAtZero: true,
          display: false
        }
      },
    }
    const config2: ChartConfiguration = {
      type: 'polarArea',
      data: data2,
      options: options2
    }
    Chart.overrides.polarArea.plugins.legend.position = 'left';
    Chart.overrides.polarArea.aspectRatio = 1.4;
    const chartItem2: ChartItem = document.getElementById('my-chart2') as ChartItem
    new Chart(chartItem2, config2)

  };



}
