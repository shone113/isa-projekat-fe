import { Component } from '@angular/core';
import { SingleMessageComponent } from '../single-message/single-message.component';
import { Message } from '../models/message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importuj CommonModule
import "../../init";

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { User } from '../models/user.model';

@Component({
  selector: 'app-messages-chat',
  standalone: true,
  imports: [
    SingleMessageComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './messages-chat.component.html',
  styleUrl: './messages-chat.component.css'
})
export class MessagesChatComponent {

  private serverUrl = 'http://localhost:8080/socket'
  private stompClient: any;
  // form!: FormGroup;
  // userForm!: FormGroup;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  messages: Message[] = [];
  decodedToken: any;
  inputContent: string = '';
  token: string = '';
  user?: User;

  constructor(private http: HttpClient){}

  ngOnInit(){
    //this.sendMessageUsingRest();

    this.initializeWebSocketConnection();

    const token = localStorage.getItem('jwt') || '';
    this.decodedToken = jwtDecode(token);
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    // this.http.get<User>(`http://localhost:8080/api/user/${this.decodedToken['userId']}`, {headers}).subscribe({
    //   next: (response) =>{
    //     this.user = response;
    //     console.log("USER: ", this.user);
    //   }
    // })

  }

  sendMessageUsingRest() {
    // if (this.form.valid) {
    //   let message: Message = {
    //     message: this.form.value.message,
    //     fromId: this.userForm.value.fromId,
    //     toId: this.form.value.toId
    //   };
    const message = {
      message: 'hello world',
      fromId: '1',
      toId: '2'
    }
    const token = localStorage.getItem('jwt') || '';
    this.decodedToken = jwtDecode(token);
      const headers = new HttpHeaders({
        'Authorization': token ? `Bearer ${token}` : ''
      });

      this.http.post<Message>(`http://localhost:8080/sendMessageRest`, message, {headers}).subscribe({
        next: (res: Message) => {
          console.log("Povratna vrednost: ", res);
        }
      })
  }

  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    // const SockJS = require('sockjs-client');
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.isLoaded = true;
      console.log("SAD JE NA TRUE: ", this.isLoaded);
      this.openGlobalSocket()
    });
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string; }) => {
        // this.handleResult(message);
        console.log("Socket poruka", JSON.parse(message.body));
        this.handleResult(message);
        // this.sendMessageUsingSocket();
      });
    }else{
      console.log("isLoaded je false, pretplata nije moguća.");
    }
  }

  sendMessageUsingSocket(event: Event) {
    event.preventDefault(); // Sprečava ponovno učitavanje stranice
    // if (this.form.valid) {
    //   let message: Message = {
    //     message: this.form.value.message,
    //     fromId: this.userForm.value.fromId,
    //     toId: this.form.value.toId
    //   };
    const token = localStorage.getItem('jwt') || '';
    this.decodedToken = jwtDecode(token);
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    console.log("TOKEN: ", this.decodedToken);

    const message = {
      content: this.inputContent,
      fromId: '1',
      toId: '2',
      creatorName: this.user?.name,
      creatorSurname: this.user?.surname,
      creationTime: new Date().toISOString()
    }
    // this.stompClient.send("/socket-subscriber/send/message", {headers}, JSON.stringify(message));
    if(message.content.length !== 0){
      this.stompClient.send("/socket-publisher", {headers}, JSON.stringify(message));

    }

    this.inputContent = '';
  }

  handleResult(message: { body: string; }) {
    if (message.body) {
      console.log("DESIO SE HANDLE");
      let messageResult: Message = JSON.parse(message.body);
      this.messages.push(messageResult);
    }
  }
}
