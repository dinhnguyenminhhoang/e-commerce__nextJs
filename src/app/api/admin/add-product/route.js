import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddnNewProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    type: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
    thumbnailUrl: Joi.string().required(),
});
export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser?.role === "admin") {
            const extracData = await req.json();
            const {
                name,
                description,
                price,
                category,
                type,
                sizes,
                deliveryInfo,
                onSale,
                priceDrop,
                imageUrl,
                thumbnailUrl,
            } = extracData;
            const { err } = AddnNewProductSchema.validate({
                name,
                description,
                price,
                category,
                type,
                sizes,
                deliveryInfo,
                onSale,
                priceDrop,
                imageUrl,
                thumbnailUrl,
            });

            if (err) {
                return NextResponse.json({
                    success: false,
                    message: err.detail[0].message,
                });
            }
            const newlyCreatedProduct = await Product.create(extracData);
            if (newlyCreatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product created successfully",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to create product",
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
