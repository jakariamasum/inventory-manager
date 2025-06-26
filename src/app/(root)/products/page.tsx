/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/features/product/productApi";
import { toast } from "react-toastify";
import Button from "@/components/ui/button";
import {
  AlertTriangle,
  Edit,
  Loader2,
  Package,
  Plus,
  Search,
  SortAsc,
  SortDesc,
  Trash2,
} from "lucide-react";
import InventoryForm from "@/components/form/inventory-form";
import InventoryInput from "@/components/form/inventory-input";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alet-dialog";
import { searchSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"name" | "stock" | "createdAt">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    page: currentPage,
    search: searchTerm,
  });

  const [deleteProduct] = useDeleteProductMutation();
  const router = useRouter();

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success(`Product "${name}" deleted successfully`);
      refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to delete product");
    }
  };

  const handleSearch = (data: any) => {
    setSearchTerm(data.search.trim());
    setCurrentPage(1);
    refetch();
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", variant: "destructive" as const };
    if (stock < 10)
      return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  const sortedProducts = data?.products
    ? [...data.products].sort((a, b) => {
        let aValue: any = a[sortBy];
        let bValue: any = b[sortBy];

        if (sortBy === "createdAt") {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        return sortOrder === "asc"
          ? aValue > bValue
            ? 1
            : -1
          : aValue < bValue
          ? 1
          : -1;
      })
    : [];

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Products
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your inventory and track stock levels
            </p>
          </div>
          <Link href="/products/add" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <InventoryForm
              onSubmit={handleSearch}
              resolver={zodResolver(searchSchema)}
            >
              <div className="flex p-4 flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
                <div className="flex-1 relative">
                  <Search className="p-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <InventoryInput
                    name="search"
                    placeholder="Search products..."
                    className="pl-10 w-full"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button type="submit" variant="outline" className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentPage(1);
                      refetch();
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </InventoryForm>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Inventory Overview</CardTitle>
                <CardDescription>
                  {data?.total ? `${data.total} products found` : "Loading..."}
                </CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSortBy("name");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Name{" "}
                  {sortBy === "name" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="ml-1 h-3 w-3" />
                    ) : (
                      <SortDesc className="ml-1 h-3 w-3" />
                    ))}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSortBy("stock");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Stock{" "}
                  {sortBy === "stock" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="ml-1 h-3 w-3" />
                    ) : (
                      <SortDesc className="ml-1 h-3 w-3" />
                    ))}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2 text-sm">Loading products...</span>
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load products. Please try again.
                </AlertDescription>
              </Alert>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Try adjusting your search or add a new product.
                </p>
                <Link href="/products/add">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedProducts.map((product) => {
                      const stockStatus = getStockStatus(product.stock);
                      return (
                        <TableRow key={product._id}>
                          <TableCell>
                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                              <Image
                                src={product.image || ""}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Badge variant={stockStatus.variant}>
                              {stockStatus.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  router.push(`/products/edit/${product._id}`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="max-w-sm text-center mx-auto ">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Product
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete{" "}
                                      {product.name}? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDelete(product._id, product.name)
                                      }
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(data.totalPages, prev + 1)
                    )
                  }
                  disabled={currentPage === data.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;
