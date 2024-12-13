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

export interface IChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
}
