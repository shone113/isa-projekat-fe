import { Component } from '@angular/core';
import { SingleMessageComponent } from '../single-message/single-message.component';
import { Message } from '../models/message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-messages-chat',
  standalone: true,
  imports: [
    SingleMessageComponent
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

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.sendMessageUsingRest();

    this.initializeWebSocketConnection();
    this.sendMessageUsingSocket();
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
    // let ws = new SockJS(this.serverUrl);
    // this.stompClient = Stomp.over(ws);
    // let that = this;

    // this.stompClient.connect({}, function () {
    //   that.isLoaded = true;
    //   that.openGlobalSocket()
    // });
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string; }) => {
        // this.handleResult(message);
        console.log("Socket poruka", message);
      });
    }
    console.log("IsLoaded: ", this.isLoaded)
  }

  sendMessageUsingSocket() {
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

    const message = {
      message: 'hello world using socket',
      fromId: '1',
      toId: '2'
    }
    this.stompClient.send(`http://localhost:8080/socket-subscriber/send/message`, JSON.stringify(message), {headers}).subscribe({
      next: (res: Message) => {
        console.log("Povratna vrednost: ", res);
      }
    })

      // Primer slanja poruke preko web socketa sa klijenta. URL je
      //  - ApplicationDestinationPrefix definisan u config klasi na serveru (configureMessageBroker() metoda) : /socket-subscriber
      //  - vrednost @MessageMapping anotacije iz kontrolera na serveru : /send/message
      // this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));

      // post(data: Message) {
      //   return this.http.post<Message>(this.url, data)
      //     .pipe(map((data: Message) => { return data; }));
      // }
  }
}
