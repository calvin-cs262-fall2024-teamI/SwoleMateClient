export interface IUserMatch {
  id: string;
  name: string;
  age: number;
  height: number;
  typeOfWorkout: string;
  weight: number;
  gym: string;
  city: string;
  rating: number;
  experience: string;
  showMore?: boolean;
  isTrainer: boolean;
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
