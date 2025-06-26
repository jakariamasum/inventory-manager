/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import Link from "next/link";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { toast } from "react-toastify";
import { AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Button from "@/components/ui/button";
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
import InventoryImageUpload from "@/components/form/inventory-image";
import { useRouter } from "next/navigation";
import { updateProductSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const EditProduct = ({ params }: { params: { id: string } }) => {
  const {
    data: product,
    isLoading: isLoadingProduct,
    error,
  } = useGetProductQuery(params.id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    try {
      const res = await updateProduct({
        _id: params.id,
        name: data.name,
        image: data.image,
        stock: Number(data.stock),
      }).unwrap();

      toast.success("Product updated successfully");
      console.log("Product updated:", res);
      router.push("/products");
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update product");
    }
  };

  if (isLoadingProduct) {
    return (
      <div>
        <div className="min-h-screen bg-background">
          {/* <Navbar /> */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading product...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="min-h-screen bg-background">
          {/* <Navbar /> */}
          <div className="container mx-auto px-4 py-8">
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Failed to load product. Please try again or go back to the
                products list.
              </AlertDescription>
            </Alert>
            <div className="text-center mt-4">
              <Link href="/products">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-background">
        {/* <Navbar /> */}

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
                Edit Product
              </h1>
              <p className="text-muted-foreground">
                Update product information
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Update the details for this product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryForm onSubmit={onSubmit} defaultValues={product}>
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
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating Product...
                        </>
                      ) : (
                        "Update Product"
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
export default EditProduct;
