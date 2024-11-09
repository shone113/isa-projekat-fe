export class Post {
  id: number;
  image: string;
  description: string;
  likesCount: number;
  date: Date;
  comments: Comment[];

  constructor(
    id: number,
    image: string,
    description: string,
    likesCount: number,
    date: Date,
    comments: Comment[]
  ) {
    this.id = id;
    this.image = image;
    this.description = description;
    this.likesCount = likesCount;
    this.date = date;
    this.comments = comments;
  }
}

