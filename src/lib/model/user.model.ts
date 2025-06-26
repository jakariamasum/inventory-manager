/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { envConfig } from "@/config";
import { IUser } from "../interface/auth.interface";

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(
      this.password,
      Number(envConfig.bcrypt_salt!)
    );
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
