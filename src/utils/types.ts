export interface INote {
  _id: string;
  title: string;
  author: string;
  anonym: boolean;
  tags: string[];
  text: string;
  image?: string;
  creation_date: string;
}
