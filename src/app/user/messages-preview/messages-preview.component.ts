import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { MessagesChatComponent } from '../messages-chat/messages-chat.component';
import { Chat } from '../models/chat.model';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-messages-preview',
  standalone: true,
  imports: [
    MessagesChatComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './messages-preview.component.html',
  styleUrl: './messages-preview.component.css'
})
export class MessagesPreviewComponent {

  decodedToken: any;
  token: any;
  user: string = '';
  chats: Chat[] = [];
  selectedChat?: Chat | null = null;
  showProfiles: boolean = false;
  profiles: Profile[] = [];
  chatProfiles: Profile[] = [];
  title: string = '';
  loggedUserProfile: Profile | null = null;
  loggedProfileId?: number;
  clickedChatTitle: string = '';
  @Output() chatSelected = new EventEmitter<number>(); // Emituje ID selektovanog četa

  constructor(private http: HttpClient){
  }

  ngOnInit(): void {
    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    this.decodedToken =  jwtDecode(this.token);

    const headers = new HttpHeaders({
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    });

    this.loggedProfileId = this.decodedToken['profileId'];
    console.log("ULOGOVAN PROFILE: ", this.loggedProfileId);

    this.http.get<Profile>(`http://localhost:8080/api/profile/user?id=${this.decodedToken['userId']}`, {headers}).subscribe({
      next: (response) =>{
        this.loggedUserProfile = response;
        this.loadProfiles();
        this.loadChats();
        console.log("LOGOVAN KORISNIK: ", this.loggedUserProfile);
      }
    })

  }

  loadProfiles(): void{
    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    this.decodedToken =  jwtDecode(this.token);

    const headers = new HttpHeaders({
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    });
    this.http.get<Profile[]>(`http://localhost:8080/api/profile/all`, {headers}).subscribe({
      next: (response) =>{
        //this.profiles = response;
        this.profiles = response.filter(profile => profile.id !== this.loggedUserProfile?.id);
        this.chatProfiles = response;
        console.log("Profiles: ", this.profiles);
      }
    })
  }

  loadChats(): void{
    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    this.decodedToken =  jwtDecode(this.token);

    const headers = new HttpHeaders({
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    });

    this.http.get<Chat[]>(`http://localhost:8080/api/chat/for-user/${this.loggedUserProfile?.id}`, {headers}).subscribe({
      next: (response) =>{
        this.chats = response.filter((chat) => chat.chatType == 'GROUP');
        console.log("CHATS: ", this.chats);
      }
    })

  }

  openChatModal(): void{
    this.showProfiles = true;
  }

  onChatClick(chat: Chat): void{
    this.selectedChat = chat;
    this.clickedChatTitle = this.selectedChat.title;
    console.log("SELEKTOVANI CHAT", this.selectedChat);
    this.chatSelected.emit(chat.id); // Emituje ID selektovanog četa

    this.chatProfiles = chat.members.map(member => ({
      ...member,
      chatMember: true, // Obeležavamo da su članovi chata
    }));

    // 2. Dodavanje ostalih profila koji nisu u chat.members
    this.profiles.forEach(profile => {
      const isMember = chat.members.some(member => member.user!.id === profile.user?.id);
      if (!isMember) {
        // Ako profil nije već član, dodajemo ga u chatProfiles sa chatMember = false
        this.chatProfiles.push({
          ...profile,
          chatMember: false,
        });
      }
    });

  }

  onDmClick(profile: Profile): void{
    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    this.decodedToken =  jwtDecode(this.token);
    this.chatProfiles = [];

    const headers = new HttpHeaders({
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    });

    this.http.get<Chat>(`http://localhost:8080/api/chat/${this.loggedProfileId}/${profile.id}`, {headers}).subscribe({
      next: (response) =>{
        this.selectedChat = response;
        this.clickedChatTitle = profile.user?.name + ' ' + profile.user?.surname;
        this.chatSelected.emit(response.id); // Emituje ID selektovanog četa

      }
    })
  }

  closeModal() {
    this.showProfiles = false;
  }

  createChat(): void{
    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    this.decodedToken =  jwtDecode(this.token);
    const headers = new HttpHeaders({
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    });

    const chatMembers: number[] = [];
    this.profiles.forEach(profile => {
      if (profile.chatMember) {
        chatMembers.push(profile.id); // Dodajte ID u niz
      }
    });

    //adding admin profile id to members
    chatMembers.push(this.loggedUserProfile!.id);
    const newChat = {
      title: this.title,
      members: chatMembers.map(id => ({ id })), // Mapiramo članove u objekte sa "id"
      adminProfileId: this.decodedToken['profileId'],
      chatType: 'GROUP'
    }

    console.log("OVO JE NOVI CHAT", newChat);
    this.http.post<Chat>(`http://localhost:8080/api/chat`, newChat, {headers}).subscribe({
      next: (response) =>{
        this.chats.push(response);
        console.log("Profiles: ", this.chats);
        this.showProfiles = false;
      }
    })
  }

  onChatMemberChange(profile: Profile, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    profile.chatMember = isChecked;
  }

  addRemoveMember(profile: Profile, event: Event){
    const isChecked = (event.target as HTMLInputElement).checked;
    profile.chatMember = isChecked;

    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    this.decodedToken =  jwtDecode(this.token);
    const headers = new HttpHeaders({
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    });

    if(isChecked){
      //add member
      this.http.put<Chat>(`http://localhost:8080/api/chat/add-member/${this.selectedChat?.id}?profileId=${profile.id}`, {headers}).subscribe({
        next: (response) =>{
          console.log("Member added: ", response);
          // const foundMember = this.selectedChat?.members.find(member => member?.id === profile.id);
          // foundMember!.chatMember = true;
          const chatIndex = this.chats.findIndex(chat => chat.id === response.id);

          if (chatIndex !== -1) {
            this.chats[chatIndex] = response; // Zamenjujemo postojeći chat sa novim
          } else {
            this.chats.push(response); // Ako chat ne postoji, dodajemo ga kao novi
          }
          this.chats = [...this.chats]; // Kreiranje nove reference

          this.onChatClick(response);
        }
      })
    }else{
      console.log("ULAZIM U ELSEEE*************");
      //remove member
      this.http.put<Chat>(`http://localhost:8080/api/chat/remove-member/${this.selectedChat?.id}?profileId=${profile.id}`, {headers}).subscribe({
        next: (response) =>{
          console.log("Member removed: ", response);
          // const foundMember = this.selectedChat?.members.find(member => member?.id === profile.id);
          // foundMember!.chatMember = false;
          const chatIndex = this.chats.findIndex(chat => chat.id === response.id);

          if (chatIndex !== -1) {
            this.chats[chatIndex] = response; // Zamenjujemo postojeći chat sa novim
          } else {
            this.chats.push(response); // Ako chat ne postoji, dodajemo ga kao novi
          }
          this.chats = [...this.chats]; // Kreiranje nove reference

          this.onChatClick(response);
        }
      })
    }
  }
}
