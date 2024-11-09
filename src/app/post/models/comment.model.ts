
export class Comment {
  id: number;
  content: string;
  creationDate: string;
  creatorId: number;
  postId: number;
  creatorName: string;
  creatorSurname: string;

  constructor(
    id: number,
    content: string,
    creationDate: string,
    creatorId: number,
    postId: number,
    creatorName: string,
    creatorSurname: string
  ) {
    this.id = id;
    this.content = content;
    this.creationDate = creationDate;
    this.creatorId = creatorId;
    this.postId = postId;
    this.creatorName = creatorName;
    this.creatorSurname = creatorSurname;
  }
}
