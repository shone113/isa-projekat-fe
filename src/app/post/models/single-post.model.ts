export class Post {
  id: number;
  image: string;
  description: string;
  likes: number;
  date: Date;
  comments: Comment[];

  constructor(
    id: number,
    image: string,
    description: string,
    likes: number,
    date: Date,
    comments: Comment[]
  ) {
    this.id = id;
    this.image = image;
    this.description = description;
    this.likes = likes;
    this.date = date;
    this.comments = comments;
  }
}

export class Comment {
  author: string;
  text: string;
  date: Date;

  constructor(author: string, text: string, date: Date) {
    this.author = author;
    this.text = text;
    this.date = date;
  }
}
