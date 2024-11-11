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
    NgModel
    ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {

  displayedColumns: string[] = ['name', 'surname', 'email', 'posts', 'followers'];
  dataSource = new MatTableDataSource<User>(); // zameni USERS_DATA pravim podacima
  searchName: string = '';
  searchSurname: string = '';
  searchEmail: string = '';
  minPostsCount?: number;
  maxPostsCount?: number;
  totalUsers = 22;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

  }
}
