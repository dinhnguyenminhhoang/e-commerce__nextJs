import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import Comment from "@/models/comment";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewComment = Joi.object({
    comment: Joi.string().required(),
    userID: Joi.string().required(),
    productID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const data = await req.json();

            const { comment, productID, userID } = data;

            const { error } = AddNewComment.validate({
                comment,
                productID,
                userID,
            });

            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                });
            }

            const newlyAddedComment = await Comment.create(data);

            if (newlyAddedComment) {
                return NextResponse.json({
                    success: true,
                    message: "comment added successfully",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message:
                        "failed to add an comment ! Please try again later",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
            });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}
