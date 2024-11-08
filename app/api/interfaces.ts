export interface IUserMatch {
  id: string;
  name: string;
  age: number;
  height: string;
  weight: string;
  matched?: boolean;
  pending?: boolean;
}

export interface IChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: any;
}
