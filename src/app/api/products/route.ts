/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyAuthToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Product } from "@/lib/model/product.model";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = verifyAuthToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    let query: any = {};
    console.log(search, page, limit, skip, query);
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          {
            userId: (user as any).userId,
            name: { $regex: search, $options: "i" },
          },
        ],
      };
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      products,
      currentPage: page,
      totalPages,
      total,
    });
  } catch (error: any) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyAuthToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { name, image, stock } = await request.json();
    const userId = cookies().get("userId")?.value || (user as any).userId;
    console.log("Creating product with data:", { name, image, stock, userId });

    const product = await Product.create({
      name,
      image,
      stock,
      userId: (user as any).userId,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
