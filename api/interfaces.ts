import { ExperienceLevel, Gender } from "./enums";

export interface BaseResponse<T = any> {
  data: T | null;
  meta: object | null;
  msg: string | null;
  success: boolean;
}

export interface LoginResponse extends BaseResponse {
  data: {
    id: number;
    username: string;
    emailAddress: string;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IUser {
  id: number;
  emailAddress: string;
  username: string;
  firstName: string;
  lastName: string;
  city: string;
  height_feet: number;
  height_inches: number;
  weight: number;
  age: number;
  gender: string;
  profilePictureUrl: string | null;
  experienceLevel: string;
  bio: string;
  isTrainer: boolean;
  cost: number;
}

export interface IReview {
  id: number;
  reviewerId: number;
  reviewedId: number;
  rating: number;
  reviewText: string;
}

export interface RegisterRequest {
  emailAddress: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  height_feet: number;
  height_inches: number;
  weight: number;
  gender: string;
  profilePictureUrl: string | null;
  experienceLevel: string;
  bio?: string;
  isTrainer?: boolean;
  cost?: number;
}
//The match type should reflect the structure of the data returned by the buddy matches endpoint.
export interface IMatch {
  id: number;
  requesterId: number;
  receiverId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  image: string;
}
export interface socialUser {
  id: number;
  name: string;
  status: string;
  profilePictureURL: string | null;
}
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
