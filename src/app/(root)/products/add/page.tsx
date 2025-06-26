/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InventoryForm from "@/components/form/inventory-form";
import InventoryImageUpload from "@/components/form/inventory-image";
import InventoryInput from "@/components/form/inventory-input";
import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { addProduct } from "@/redux/features/product/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { productSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { toast } from "react-toastify";
const AddProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const res = await createProduct({
        name: data.name,
        image: data.image,
        stock: Number.parseInt(data.stock),
      }).unwrap();
      dispatch(addProduct(res));
      toast.success("Product created successfully");
      router.push("/products");
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to create product");
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/products">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Add New Product
              </h1>
              <p className="text-muted-foreground">
                Create a new product in your inventory
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Fill in the details for your new product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryForm
                  onSubmit={handleSubmit}
                  resolver={zodResolver(productSchema)}
                >
                  {/* Product Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <InventoryInput
                      name="name"
                      placeholder="Enter product name"
                    />
                  </div>

                  {/* Product Image */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Product Image URL *</Label>
                    <InventoryImageUpload name="image" />
                  </div>

                  {/* Stock and Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <InventoryInput
                        name="stock"
                        type="number"
                        placeholder="Enter stock quantity"
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Product...
                        </>
                      ) : (
                        "Create Product"
                      )}
                    </Button>
                    <Link href="/products" className="flex-1">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </InventoryForm>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
