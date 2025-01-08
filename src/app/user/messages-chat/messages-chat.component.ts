import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  loggedProfileId?: number;
  @Input() title!: string;
  @Input() chatId!: number;

  constructor(private http: HttpClient){}

  ngOnInit(){
    //this.sendMessageUsingRest();

    this.initializeWebSocketConnection();

    const token = localStorage.getItem('jwt') || '';
    this.decodedToken = jwtDecode(token);
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.loggedProfileId = this.decodedToken['profileId'];

    this.http.get<User>(`http://localhost:8080/api/user/${this.decodedToken['userId']}`, {headers}).subscribe({
      next: (response) =>{
        this.user = response;
        console.log("USER: ", this.user);
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title'] || changes['chatId']) {
      // Reagujte na promenu
      this.onChatSelected(this.chatId);
      console.log("OVO JE ON CHANGES    ", this.chatId, "   !!!!!!!!!!!!");
    }
  }


  onChatSelected(chatId: number): void {
    const token = localStorage.getItem('jwt') || '';
    this.decodedToken = jwtDecode(token);
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.http.get<Message[]>(`http://localhost:8080/api/message/${this.chatId}`, {headers}).subscribe({
      next: (response) => {
        this.messages = response;
        console.log("UCITAVAM PORUKE ZA ID ", this.chatId, ": ", response);
      }
    })
  }


  sendMessageUsingRest(message: Message) {

    const token = localStorage.getItem('jwt') || '';
    this.decodedToken = jwtDecode(token);
      const headers = new HttpHeaders({
        'Authorization': token ? `Bearer ${token}` : ''
      });

      console.log("REST MESSAGE BEFORE SENDING: ", message);
      this.http.post<Message>(`http://localhost:8080/api/message`, message, {headers}).subscribe({
        next: (res: Message) => {
          console.log("Povratna vrednost REST : ", res);
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

  handleResult(message: { body: string; }) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log("DESIO SE HANDLE", messageResult);
      this.messages.push(messageResult);
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
      chatId: this.chatId,
      content: this.inputContent,
      creatorId: this.decodedToken['profileId'],
      creatorName: this.user!.name,
      creatorSurname: this.user!.surname,
      creationTime: new Date().toISOString()
    }
    // this.stompClient.send("/socket-subscriber/send/message", {headers}, JSON.stringify(message));
    if(message.content.length !== 0){
      console.log("PORUKA PRE SLANJA: ", JSON.stringify(message));
      this.stompClient.send("/socket-publisher", {headers}, JSON.stringify(message));
      this.sendMessageUsingRest(message);
    }

    this.inputContent = '';
  }


}
