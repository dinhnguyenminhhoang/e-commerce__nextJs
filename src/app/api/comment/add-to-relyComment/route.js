import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const extractData = await req.json();
            const { _id, replies } = extractData;
            const updatedComment = await Comment.findOneAndUpdate(
                {
                    _id: _id,
                },
                {
                    replies,
                },
                { new: true }
            );

            if (updatedComment) {
                return NextResponse.json({
                    success: true,
                    message: "Comment updated successfully",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message:
                        "Failed to update the Comment ! Please try again later",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
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
