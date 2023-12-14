import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const sortPrice = searchParams.get("sortPrice");
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        let order = {};
        if (type === "ALL") {
            order = {
                category: category,
            };
        } else {
            order = {
                type: type,
                category: category,
            };
        }
        if (search !== "") {
            order = { ...order, name: { $regex: search, $options: "i" } };
        }
        const getData = await Product.find(order).sort({
            price: sortPrice,
        });
        if (getData) {
            return NextResponse.json({
                success: true,
                data: getData,
            });
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No Products found !",
            });
        }
    } catch (e) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}
