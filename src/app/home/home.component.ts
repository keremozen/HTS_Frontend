import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  barData: any;
  barOptions: any;
  doughnutData: any;
  doughnutOptions: any;
  polarData: any;
  polarOptions: any;
  barData2: any;
  barOptions2: any;

  get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  constructor(private oAuthService: OAuthService, private authService: AuthService) { }

  ngOnInit(): void {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: ['Erkek', 'Kadın'],
      datasets: [
        {
          data: [540, 325],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.barOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Cinsiyete Göre Dağılım'
        },
        legend: {
          display:false,
          position: 'bottom',
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.doughnutData = {
      labels: ['Türkiye', 'Amerika', 'İngiltere', 'Fransa'],
      datasets: [
        {
          data: [250, 50, 100, 75],
          backgroundColor: ['rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(153, 102, 255, 0.6)'],
          hoverBackgroundColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)']
        }
      ]
    };

    this.doughnutOptions = {
      cutout: '40%',
      plugins: {
        title: {
          display: true,
          text: 'Uyruğa Göre Dağılım'
        },
        legend: {
          position: 'bottom',
          labels: {
            color: textColor
          }
        }
      }
    };

    this.polarData = {
      datasets: [
        {
          data: [11, 16, 7, 3, 14],
          backgroundColor: [
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--bluegray-500'),
            documentStyle.getPropertyValue('--blue-500')
          ],
          label: 'My dataset'
        }
      ],
      labels: ['Ankara Şehir Hastanesi', 'Başakşehir Çam ve Sakura Şehir Hastanesi', 'Konya Şehir Hastanesi', 'Eskişehir Şehir Hastanesi', 'Balıkesir Şehir Hastanesi']
    };

    this.polarOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Hastanelere Göre Dağılım'
        },
        legend: {
          position: 'right',
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: surfaceBorder
          }
        }
      }
    };

    this.barData2 = {
      labels: ['Ankara Şehir Hastanesi', 'Başakşehir Çam ve Sakura Şehir Hastanesi', 'Konya Şehir Hastanesi', 'Eskişehir Şehir Hastanesi', 'Balıkesir Şehir Hastanesi'],
      datasets: [
        {
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56]
        }
      ]
    };

    this.barOptions2 = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        title: {
          display: true,
          text: 'Hastanelere Göre Dağılım'
        },
        legend: {
          display: false,
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

  }

  login() {
    this.authService.navigateToLogin();
  }
}
