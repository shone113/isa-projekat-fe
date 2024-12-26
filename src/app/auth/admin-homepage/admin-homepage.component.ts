import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-homepage',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule
  ],
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.css'
})
export class AdminHomepageComponent {

}
