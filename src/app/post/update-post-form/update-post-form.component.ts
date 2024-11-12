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
  @Output() postUpdated = new EventEmitter<void>();


  constructor(private router: Router, private http: HttpClient){

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    console.log("Odozgo: ", this.post);
    console.log("Datum: ", this.post.date);
    console.log("Ovaj moj: ", this.updatingPost);
    this.updatingPost.id = this.postId;
    this.updatingPost.likesCount = this.post.likesCount;
    this.updatingPost.publishingDate = this.post.publishingDate;
    this.updatingPost.image = this.post.image;
    this.updatingPost.description = this.post.description;
  }

  onEditPost(): void {
    console.log("UPDATING", this.updatingPost);
    this.http.put<Post>(`http://localhost:8080/api/post/update/${this.postId}`, this.updatingPost).subscribe({
      next: (response) => {
        this.toggleUpdateMenu.emit();
        this.postUpdated.emit();
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
