export class Post {
  id: number;
  imageUrl: string;
  description: string;
  likes: number;
  date: Date;


  constructor(
    id: number,
    imageUrl: string,
    description: string,
    likes: number,
    date: Date
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.description = description;
    this.likes = likes;
    this.date = date;
  }
}

export class Comment {
  author: string;
  text: string;

  constructor(author: string, text: string) {
    this.author = author;
    this.text = text;
  }
}
