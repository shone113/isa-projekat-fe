import { User } from "../../user/models/user.model";

export class Post {
  id: number;
  image: string;
  description: string;
  likesCount: number;
  date: Date;
  comments: Comment[];
  publishingDate: Date;
  creatorProfileId: number;
  liked: boolean;
  creatorName: string;
  creatorSurname: string;
  user?: User;
  longitude: number;
  latitude: number;

  constructor(
    id: number,
    image: string,
    description: string,
    likesCount: number,
    date: Date,
    comments: Comment[],
    publishingDate: Date,
    creatorProfileId: number,
    liked: boolean,
    creatorName: string,
    creatorSurname: string,
    longitude: number,
    latitude: number
  ) {
    this.id = id;
    this.image = image;
    this.description = description;
    this.likesCount = likesCount;
    this.date = date;
    this.comments = comments;
    this.publishingDate = publishingDate;
    this.creatorProfileId = creatorProfileId;
    this.liked = liked;
    this.creatorName = creatorName;
    this.creatorSurname = creatorSurname;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

