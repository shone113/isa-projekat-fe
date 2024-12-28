import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit, OnChanges {

  @Input() postId!: number;
  @Output() reloadComments = new EventEmitter<Comment>();
  newCommentContent: string = '';
  decodedToken: any;

  constructor(private router: Router, private http: HttpClient){}

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    console.log("KOMENTAR: ", this.newCommentContent);
  }

  submitComment(): void{

    const token = localStorage.getItem('jwt') || '';
    this.decodedToken = jwtDecode(token);
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    const profileId = this.decodedToken['userId']

    const commentDTO = {
      content: this.newCommentContent,
      postId: this.postId,
      creatorId: profileId
    };

    console.log("PROFILE IDDDDDDD: ", profileId);

    this.http.post<Comment>('http://localhost:8080/api/comment', commentDTO,{headers}).subscribe({
      next: (response) => {
        console.log('Komentar uspešno kreiran:', response);

        this.reloadComments.emit();
        this.newCommentContent = '';
      },
      error: (err) => {
        console.error('Greška pri kreiranju komentara:', err);
        alert("You are need to login!")
      }
    });
  }
}
