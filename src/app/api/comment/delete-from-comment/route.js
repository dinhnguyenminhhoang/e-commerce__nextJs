import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get("id");
            if (!id)
                return NextResponse.json({
                    success: false,
                    message: "Comment Item ID is required",
                });

            const deleteCommentItem = await Comment.findByIdAndDelete(id);

            if (deleteCommentItem) {
                return NextResponse.json({
                    success: true,
                    message: "Comment Item deleted successfully",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message:
                        "Failed to delete Comment item ! Please try again.",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
            });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again",
        });
    }
}
