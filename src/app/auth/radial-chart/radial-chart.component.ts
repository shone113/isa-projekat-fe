import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { WeeklyStatistic } from '../models/weekly-statistic.interface';

@Component({
  selector: 'app-radial-chart',
  standalone: true,
  imports: [

  ],
  templateUrl: './radial-chart.component.html',
  styleUrl: './radial-chart.component.css'
})
export class RadialChartComponent {

  @Input() graphType: string = '';

  chartInstance: Chart | null = null;
  title: string = '';

  chartdata: any[] = [];
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  constructor(private http: HttpClient){

  }

  ngOnInit() {
    // Definišemo podatke za grafikon
    // this.labeldata = ['Users', 'LeftUsers'];
    // this.realdata = [70, 30];
    this.colordata = ['#007bff', '#e2e2e2'];

    // Pozivamo render metodu sa prosleđenim podacima
    this.Renderchar(this.labeldata, this.realdata, this.colordata);
  }

   ngOnChanges(changes: SimpleChanges): void {
      // Provera da li su `section` ili `timeSpan` promenjeni
      if (changes['graphType']) {
        if(this.graphType == 'posts'){
          this.title = 'Users who have made a post';
          this.loadUsersWithPosts();
        } else if(this.graphType == 'comments'){
          this.title = 'Users who have made a comment';
          this.loadUsersWithComments();
        }else if(this.graphType == 'no-posts-or-comments'){
          this.title = 'Users who have not made any posts or comments';
          this.loadUsersWithoutPostsOrComments();
        }
      }

    }

  loadUsersWithPosts(): void{
        const token = localStorage.getItem('jwt');
        const headers = new HttpHeaders({
          'Authorization': token ? `Bearer ${token}` : ''
        });

        this.realdata = [];
        this.labeldata = [];
         this.http.get<WeeklyStatistic>(`http://localhost:8080/api/profile/has-posts`, { headers}).subscribe({
            next: (response: WeeklyStatistic) => {
              const entries = Object.entries(response);

              entries.forEach(([label, value]) => {
                this.labeldata.push(label);
                this.realdata.push(value);
              });
              console.log('labele', this.labeldata);
              console.log('podaci', this.realdata);
              console.log(response);

              this.Renderchar(this.labeldata, this.realdata, this.colordata);
            },
            error: (err) => {
              console.error('Greška pri učitavanju korisnika:', err);
            }
          });
  }

  loadUsersWithComments(): void{
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.realdata = [];
    this.labeldata = [];
     this.http.get<WeeklyStatistic>(`http://localhost:8080/api/profile/has-comments-only`, { headers}).subscribe({
        next: (response: WeeklyStatistic) => {
          const entries = Object.entries(response);

          entries.forEach(([label, value]) => {
            this.labeldata.push(label);
            this.realdata.push(value);
          });
          console.log('labele', this.labeldata);
          console.log('podaci', this.realdata);
          console.log(response);

          this.Renderchar(this.labeldata, this.realdata, this.colordata);
        },
        error: (err) => {
          console.error('Greška pri učitavanju korisnika:', err);
        }
      });
  }

  loadUsersWithoutPostsOrComments(): void{
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.realdata = [];
    this.labeldata = [];
     this.http.get<WeeklyStatistic>(`http://localhost:8080/api/profile/neither-posts-nor-comments`, { headers}).subscribe({
        next: (response: WeeklyStatistic) => {
          const entries = Object.entries(response);

          entries.forEach(([label, value]) => {
            this.labeldata.push(label);
            this.realdata.push(value);
          });
          console.log('labele', this.labeldata);
          console.log('podaci', this.realdata);
          console.log(response);

          this.Renderchar(this.labeldata, this.realdata, this.colordata);
        },
        error: (err) => {
          console.error('Greška pri učitavanju korisnika:', err);
        }
      });
  }

  Renderchar(labeldata: any, valuedata: any, colordata: any){

    if (this.chartInstance) {
      this.chartInstance.destroy();
      console.log("Unistavam grafik");
    }

    this.chartInstance  = new Chart('radialChart', {
      type: 'doughnut',
      data:{
        labels: labeldata,
        datasets: [
          {
            label: 'Broj objava',
            data: valuedata,
            borderColor: '#007bff',
            //backgroundColor: 'rgba(0, 123, 255, 0.2)',
            backgroundColor: colordata,
            borderWidth: 2,
          }
        ]
      },

    })
  }
}
