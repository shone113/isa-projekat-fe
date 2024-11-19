import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SimpleChanges } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { Page} from '../models/page.model';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    MatPaginator,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    FormsModule
    ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {

  displayedColumns: string[] = ['name', 'surname', 'email', 'posts', 'following-count'];
  dataSource = new MatTableDataSource<User>(); // zameni USERS_DATA pravim podacima
  searchName: string = '';
  searchSurname: string = '';
  searchEmail: string = '';
  minPostsCount?: number;
  maxPostsCount?: number;
  totalUsers! : number;
  users: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private http: HttpClient){}

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  getUsers(pageIndex: number = 0, pageSize: number = 5): void {
    const params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());

      const token = localStorage.getItem('jwt');
      const headers = new HttpHeaders({
        'Authorization': token ? `Bearer ${token}` : ''
      });

    this.http.get<Page<User>>(`http://localhost:8080/api/user/paged`, { params, headers}).subscribe({
      next: (response: Page<User>) => {
        this.users = response.content;
        this.dataSource.data = this.users;
        this.totalUsers = response.totalElements;
        console.log("USERS", response.content);
      },
      error: (err) => {
        console.error('Greška pri učitavanju korisnika:', err);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.getUsers(pageIndex, pageSize);
  }

  // getUsers(): void{
  //   this.http.get<User[]>(`http://localhost:8080/api/user`).subscribe({
  //     next: (response) => {
  //       this.users = response;
  //       this.dataSource.data = this.users;
  //       console.log("USERS", this.users);
  //     },
  //     error: (err) => {
  //       console.error('Greška pri učitavanju korisnika:', err);
  //     }
  //   });
  // }

  sortData() {
    const sortField = this.sort.active;  // Field to sort by (e.g., 'email' or 'followers')
    const sortDirection = this.sort.direction;  // 'asc' or 'desc'

    if (sortField && sortDirection) {
      this.getSortedUsers(sortField, sortDirection);  // Fetch sorted data from backend
    }
  }

  // getSortedUsers(sortField: string = 'name', sortDirection: string = 'asc'): void {
  //   const url = `http://localhost:8080/api/user/sort/${sortField}-${sortDirection}`;

  //   this.http.get<User[]>(url).subscribe({
  //     next: (response) => {
  //       this.users = response;
  //       this.dataSource.data = this.users;
  //       console.log('USERS', this.users);
  //     },
  //     error: (err) => {
  //       console.error('Greška pri učitavanju korisnika:', err);
  //     }
  //   });
  // }


  getSortedUsers(sortField: string = 'name', sortDirection: string = 'asc'): void {
    const pageIndex: number = 0
    const pageSize: number = 5
    const params = new HttpParams()
    .set('page', pageIndex.toString())
    .set('size', pageSize.toString());

    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    const url = `http://localhost:8080/api/user/sort/${sortField}-${sortDirection}/paged`;

    this.http.get<Page<User>>(url, {params, headers}).subscribe({
      next: (response: Page<User>) => {
        this.users = response.content;
        this.dataSource.data = this.users;
        this.totalUsers = response.totalElements;
        console.log("USERS", response.content);
      },
      error: (err) => {
        console.error('Greška pri učitavanju korisnika:', err);
      }
    });
  }

  // onSearch(): void{
  //   // Prikupljanje svih parametara sa forme
  //   const params = new HttpParams()
  //     .set('name', this.searchName)
  //     .set('surname', this.searchSurname)
  //     .set('email', this.searchEmail)
  //     .set('minPostsRange', this.minPostsCount ? this.minPostsCount.toString() : '')
  //     .set('maxPostsRange', this.maxPostsCount ? this.maxPostsCount.toString() : '');

  //   this.http.get<User[]>('http://localhost:8080/api/user/filter', { params })
  //     .subscribe({
  //       next: (response) => {
  //         this.users = response;
  //         this.dataSource.data = this.users;
  //       },
  //       error: (err) => {
  //         console.error('Greška pri učitavanju korisnika:', err);
  //       }
  //     });
  // }

  onSearch(): void{
    const pageIndex: number = 0
    const pageSize: number = 5

    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    const params = new HttpParams()
      .set('name', this.searchName)
      .set('surname', this.searchSurname)
      .set('email', this.searchEmail)
      .set('minPostsRange', this.minPostsCount ? this.minPostsCount.toString() : '')
      .set('maxPostsRange', this.maxPostsCount ? this.maxPostsCount.toString() : '')
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());


    this.http.get<Page<User>>('http://localhost:8080/api/user/filter/paged', { params, headers })
      .subscribe({
        next: (response: Page<User>) => {
          this.users = response.content;
          this.dataSource.data = this.users;
          this.totalUsers = response.totalElements;
          console.log("USERS", response.content);
        },
        error: (err) => {
          console.error('Greška pri učitavanju korisnika:', err);
        }
      });
  }

}
