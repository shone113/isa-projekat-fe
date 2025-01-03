import { Component, OnInit} from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { MessagesChatComponent } from '../messages-chat/messages-chat.component';

@Component({
  selector: 'app-messages-preview',
  standalone: true,
  imports: [
    MessagesChatComponent
  ],
  templateUrl: './messages-preview.component.html',
  styleUrl: './messages-preview.component.css'
})
export class MessagesPreviewComponent {

  decodedToken: any;
  token: any;
  user: string = '';


  constructor(private http: HttpClient){
  }

  ngOnInit(): void {
    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    this.decodedToken =  jwtDecode(this.token);
    console.log("SHONEEE", this.decodedToken);

    const headers = new HttpHeaders({
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    });

  }

  createChat(): void{

  }
}
