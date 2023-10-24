import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Poster from "@/models/poster";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddnNewPosterSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().required(),
});
export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser?.role === "admin") {
            const extracData = await req.json();
            const { name, description, imageUrl } = extracData;
            const { err } = AddnNewPosterSchema.validate({
                name,
                description,
                imageUrl,
            });
            if (err) {
                return NextResponse.json({
                    success: false,
                    message: err.detail[0].message,
                });
            }
            const newlyCreatedPoster = await Poster.create(extracData);
            if (newlyCreatedPoster) {
                return NextResponse.json({
                    success: true,
                    message: "Poster created successfully",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to create Poster",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "use not autorized",
            });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}
