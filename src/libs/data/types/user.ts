import type { UserStatus, UserType } from "../../enums/user.enum";
import { Address } from "./address";
import { Order } from "./order";
import { Payment } from "./payment";

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
  // from aggregate
  userAddresses?: Address[];
  userPayments?: Payment[];
  userOrders?: Order[];
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
