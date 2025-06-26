/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import Link from "next/link";
import { Loader2, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import InventoryInput from "@/components/form/inventory-input";
import InventoryForm from "@/components/form/inventory-form";
import Button from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.token }));
      toast.success("Login successful");
      router.push("/products");
    } catch (error: any) {
      toast.error(error.data?.message || "Login failed");
      console.error("Login error:", error);
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
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InventoryForm
              onSubmit={handleSubmit}
              resolver={zodResolver(loginSchema)}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <InventoryInput
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <InventoryInput
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </InventoryForm>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                href="/auth/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>

            <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
              <AlertDescription className="text-sm">
                <strong>Demo Credentials:</strong>
                <br />
                Email: admin@gmail.com
                <br />
                Password: 123456
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Login;
