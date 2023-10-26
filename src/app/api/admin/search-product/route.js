import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";
const unorm = require("unorm");
export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const textResult = searchParams.get("id");
        const getData = await Product.find({
            name: { $regex: textResult, $options: "i" },
        })
            .sort({ price: 1 })
            .limit(10);
        if (getData) {
            return NextResponse.json({ success: true, data: getData });
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No Product found",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}
