import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get("id");

            if (!id)
                return NextResponse.json({
                    success: false,
                    message: "Please login in!",
                });
            const extractAllCommentItems = await Comment.find({
                productID: id,
            })
                .sort({ createdAt: -1 })
                .populate("productID");

            if (extractAllCommentItems) {
                return NextResponse.json({
                    success: true,
                    data: extractAllCommentItems,
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "No Comment items are found !",
                    status: 204,
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
            });
        }
    } catch (e) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again",
        });
    }
}
