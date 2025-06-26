/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import Link from "next/link";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import { Loader2, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InventoryForm from "@/components/form/inventory-form";
import InventoryInput from "@/components/form/inventory-input";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

const Register = () => {
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const result = await register({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.token }));
      toast.success("Well come to InventoryPro!");
      router.push("/products");
    } catch (error: any) {
      toast.error(error.data?.message || "Registration failed");
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <Package className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl">InventoryPro</span>
          </Link>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Sign up to start managing your inventory
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InventoryForm
              onSubmit={handleSubmit}
              resolver={zodResolver(registerSchema)}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <InventoryInput
                  placeholder="Enter your full name"
                  name="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <InventoryInput placeholder="Enter your email" name="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <InventoryInput
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <InventoryInput
                  placeholder="Enter your confirm password"
                  name="confirmPassword"
                  type="password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </InventoryForm>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Register;
