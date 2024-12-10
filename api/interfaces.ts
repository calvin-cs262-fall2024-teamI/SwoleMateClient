import { ExperienceLevel, Gender } from "./enums";

export interface IUserMatch {
  id: string;
  emailAddress: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  height_feet: number;
  height_inches: number;
  weight: number;
  city?: string;
  gym?: string;
  showMore?: boolean; //TODO: CHANGE THIS SO WHEN IT IS CLICKED REVIEWS OF THAT USER ARE RETRIEVED.
  gender?: Gender | null;
  profilePictureUrl: string | undefined;
  experienceLevel?: ExperienceLevel | null;
  bio?: string | null;
  isTrainer: boolean;
  cost?: number;
  rating: number;
  matched?: boolean;
  pending?: boolean;
}

export interface IChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
}
