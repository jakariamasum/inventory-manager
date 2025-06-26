import { envConfig } from "@/config";
import jwt from "jsonwebtoken";

type TPayload = {
  userId: string;
  email: string;
  role: string;
};

export function createToken({ userId, email, role }: TPayload) {
  return jwt.sign({ userId, email, role }, envConfig.jwt_secret!, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, envConfig.jwt_secret!) as TPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
