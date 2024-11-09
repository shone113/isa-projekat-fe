import { Component, Input, OnChanges, OnInit, SimpleChanges, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Post } from '../models/single-post.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-post-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './update-post-form.component.html',
  styleUrl: './update-post-form.component.css'
})
export class UpdatePostFormComponent implements OnInit, OnChanges {

  @Input() postId!: number;
  @Input() post!: Post;
  updatingPost = {
    id: 0,
    description: 'string',
    likesCount: 0,
    publishingDate: new Date,
    image: 'string',
  };
  @Output() toggleUpdateMenu = new EventEmitter();


  constructor(private router: Router, private http: HttpClient){

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    console.log("Odozgo: ", this.post);
    console.log("Datum: ", this.post.date);
    console.log("Ovaj moj: ", this.updatingPost);
    this.updatingPost.likesCount = this.post.likesCount;
    this.updatingPost.publishingDate.setDate(Date.now());
    this.updatingPost.image = this.post.image;
  }

  onEditPost(): void {
    this.http.put(`http://localhost:8080/api/post/${this.postId}`, this.updatingPost).subscribe({
      next: (response) => {
        console.log("Post je ažuriran:", response);
        this.toggleUpdateMenu.emit();
      },
      error: (error) => {
        console.error("Greška pri ažuriranju posta:", error);
      }
    });
  }
  onDiscardEdit(): void {
    console.log("Klikcem ovdeeee");
    this.toggleUpdateMenu.emit();
  }

}
