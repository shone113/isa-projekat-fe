export class Post {
  id: number;
  image: string;
  description: string;
  likesCount: number;
  date: Date;
  comments: Comment[];
  publishingDate: Date;

  constructor(
    id: number,
    image: string,
    description: string,
    likesCount: number,
    date: Date,
    comments: Comment[],
    publishingDate: Date
  ) {
    this.id = id;
    this.image = image;
    this.description = description;
    this.likesCount = likesCount;
    this.date = date;
    this.comments = comments;
    this.publishingDate = publishingDate;
  }
}

