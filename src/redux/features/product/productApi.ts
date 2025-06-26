import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./productSlice";
import { RootState } from "@/redux/store";

interface CreateProductRequest {
  name: string;
  image: string;
  stock: number;
}

interface UpdateProductRequest extends CreateProductRequest {
  _id: string;
}

interface ProductsResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/products",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      { page?: number; search?: string }
    >({
      query: ({ page = 1, search = "" }) => ({
        url: `?page=${page}&search=${search}`,
      }),
      providesTags: ["Product"],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/${id}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: (product) => ({
        url: "",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: ({ _id, ...product }) => ({
        url: `/${_id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
