export interface Message {
  content: string,
  creatorId: number,
  creatorUserId?: number,
  creationTime: string;
  chatId: number;
  creatorName: string;
  creatorSurname: string;
}
