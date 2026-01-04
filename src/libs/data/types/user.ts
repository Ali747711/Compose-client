import type { UserStatus, UserType } from "../../enums/user.enum";

export interface User {
  _id: string;
  userType: UserType;
  userStatus: UserStatus;
  userNick: string;
  userPhone: string;
  userEmail?: string;
  userPassword?: string;
  userBio?: string;
  userImage?: string;
  userPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput {
  userType?: UserType;
  userStatus?: UserStatus;
  userNick: string;
  userPhone: string;
  userEmail?: string;
  userPassword: string;
  userBio?: string;
  userImage?: string;
  userPoints?: number;
}

export interface UserLoginInput {
  userNick: string;
  userPassword: string;
}

export interface UserUpdateInput {
  _id: string;
  userType?: UserType;
  userStatus?: UserStatus;
  userNick?: string;
  userPhone?: string;
  userEmail?: string;
  userPassword?: string;
  userBio?: string;
  userImage?: string;
}
