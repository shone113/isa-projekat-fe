import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DayOfWeek } from '../models/day-of-week.enum';
import { WeeklyStatistic } from '../models/weekly-statistic.interface';


@Component({
  selector: 'app-spline-chart',
  standalone: true,
  imports: [
  ],
  templateUrl: './spline-chart.component.html',
  styleUrl: './spline-chart.component.css'
})


export class SplineChartComponent {

  @Input() section: string = ''; // Sekcija (npr. "Objave" ili "Komentari")
  @Input() timeSpan: string = ''; // Vremenski period (npr. "Nedeljni", "Mesečni", "Godišnji")

  chartInstance: Chart | null = null; // Čuva referencu na trenutni grafikon
  chartdata: any[] = [];
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  myLabels: any[] = [];

  constructor(private http: HttpClient) {
    // Now you can use this.http to make HTTP requests
  }

  ngOnInit() {
    //this.selectChartToLoad();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Provera da li su `section` ili `timeSpan` promenjeni
    if (changes['section'] || changes['timeSpan']) {
      this.selectChartToLoad();
    }

  }

  selectChartToLoad(): void{

    if(this.timeSpan == 'weekly' && this.section == 'comments'){
      this.loadWeeklyComments();
    }
    else if(this.timeSpan == 'monthly' && this.section == 'comments'){
      this.loadMonthlyComments();
    }
    else if(this.timeSpan == 'yearly' && this.section == 'comments'){
      this.loadYearlyComments();
    }
     else if(this.timeSpan == 'weekly' && this.section == 'posts'){
      this.loadWeeklyPosts();
    }
    else if(this.timeSpan == 'monthly' && this.section == 'posts'){
      this.loadMonthlyPosts();
    }
    else if(this.timeSpan == 'yearly' && this.section == 'posts'){
      this.loadYearlyPosts();
    }
  }

  loadWeeklyComments(): void{

    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.realdata = [];
    this.labeldata = [];
    //this.labeldata = ['Tue','Mon', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    //this.realdata = [30, 40, 35, 50, 49, 60, 70];
    this.colordata = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5', '#FF5733', '#57FF33'];

     this.http.get<WeeklyStatistic>(`http://localhost:8080/api/comment/analytics/weekly`, { headers}).subscribe({
        next: (response: WeeklyStatistic) => {
          const entries = Object.entries(response);

          entries.forEach(([day, value]) => {
            // Pretvorite naziv dana u željeni format, npr. 'Mon' za 'MONDAY'
            const formattedDay = day.charAt(0) + day.slice(1).toLowerCase().substring(0, 2);
            this.labeldata.push(formattedDay);
            this.realdata.push(value);
          });
          console.log('staticke', this.myLabels);
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

  loadMonthlyComments(): void{

    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.realdata = [];
    this.labeldata = [];
    this.colordata = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5', '#FF5733', '#57FF33'];

     this.http.get<WeeklyStatistic>(`http://localhost:8080/api/comment/analytics/monthly`, { headers}).subscribe({
        next: (response: WeeklyStatistic) => {
          const entries = Object.entries(response);

          entries.forEach(([day, value]) => {
            this.labeldata.push(day);
            this.realdata.push(value);
          });

          console.log(response);

          this.Renderchar(this.labeldata, this.realdata, this.colordata);
        },
        error: (err) => {
          console.error('Greška pri učitavanju korisnika:', err);
        }
      });

  }

  loadYearlyComments(): void{
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.realdata = [];
    this.labeldata = [];
    this.colordata = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5', '#FF5733', '#57FF33'];

     this.http.get<WeeklyStatistic>(`http://localhost:8080/api/comment/analytics/yearly`, { headers}).subscribe({
        next: (response: WeeklyStatistic) => {
          const entries = Object.entries(response);

          entries.forEach(([day, value]) => {
            this.labeldata.push(day);
            this.realdata.push(value);
          });

          console.log(response);

          this.Renderchar(this.labeldata, this.realdata, this.colordata);
        },
        error: (err) => {
          console.error('Greška pri učitavanju korisnika:', err);
        }
      });

  }

  loadWeeklyPosts(): void{

    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.realdata = [];
    this.labeldata = [];
    this.colordata = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5', '#FF5733', '#57FF33'];
    console.log("Evo pozivam posts");
     this.http.get<WeeklyStatistic>(`http://localhost:8080/api/post/analytics/weekly`, { headers}).subscribe({
        next: (response: WeeklyStatistic) => {
          const entries = Object.entries(response);

          entries.forEach(([day, value]) => {
            // Pretvorite naziv dana u željeni format, npr. 'Mon' za 'MONDAY'
            const formattedDay = day.charAt(0) + day.slice(1).toLowerCase().substring(0, 2);
            this.labeldata.push(formattedDay);
            this.realdata.push(value);
          });
          console.log('staticke', this.myLabels);
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

  loadMonthlyPosts(): void{

    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.realdata = [];
    this.labeldata = [];
    this.colordata = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5', '#FF5733', '#57FF33'];

     this.http.get<WeeklyStatistic>(`http://localhost:8080/api/post/analytics/monthly`, { headers}).subscribe({
        next: (response: WeeklyStatistic) => {
          const entries = Object.entries(response);

          entries.forEach(([day, value]) => {
            this.labeldata.push(day);
            this.realdata.push(value);
          });

          console.log(response);

          this.Renderchar(this.labeldata, this.realdata, this.colordata);
        },
        error: (err) => {
          console.error('Greška pri učitavanju korisnika:', err);
        }
      });
  }

  loadYearlyPosts(): void{
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.realdata = [];
    this.labeldata = [];
    this.colordata = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5', '#FF5733', '#57FF33'];

     this.http.get<WeeklyStatistic>(`http://localhost:8080/api/post/analytics/yearly`, { headers}).subscribe({
        next: (response: WeeklyStatistic) => {
          const entries = Object.entries(response);

          entries.forEach(([day, value]) => {
            this.labeldata.push(day);
            this.realdata.push(value);
          });

          console.log(response);

          this.Renderchar(this.labeldata, this.realdata, this.colordata);
        },
        error: (err) => {
          console.error('Greška pri učitavanju korisnika:', err);
        }
      });

  }

  generateDaysInMonth(year: number, month: number): string[] {
    // Dobijamo broj dana u mesecu
    const daysInMonth = new Date(year, month, 0).getDate(); // `0` znači poslednji dan prethodnog meseca
    // Kreiramo niz od 1 do `daysInMonth`
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  }

  Renderchar(labeldata: any, valuedata: any, colordata: any){

    console.log("Crtanje grafika");
    if (this.chartInstance) {
      this.chartInstance.destroy();
      console.log("Unistavam grafik");
    }

    this.chartInstance = new Chart('spline', {
      type: 'line',
      data:{
        labels: labeldata,
        datasets: [
          {
            label: 'Broj objava',
            data: valuedata,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderWidth: 2,
            tension: 0.4, // Dodajemo glatkoću krive
            fill: true, // Popunjavamo prostor ispod linije
            pointBackgroundColor: '#007bff',
            pointRadius: 5, // Radijus tačaka
            pointHoverRadius: 7,
          }
        ]
      },

    })
  }
}
