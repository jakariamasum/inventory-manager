import { Model } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  password: string;
  role: "user" | "admin";
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
