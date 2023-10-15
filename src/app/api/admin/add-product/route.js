import connectToDB from "@/database";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddnNewProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
});
export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();
        const user = "adim";
        if (user === "adim") {
            const extracData = await req.json();
            const {
                name,
                description,
                price,
                imageUrl,
                category,
                sizes,
                deliveryInfo,
                onSale,
                priceDrop,
            } = extracData;
            const { err } = AddnNewProductSchema.validate({
                name,
                description,
                price,
                imageUrl,
                category,
                sizes,
                deliveryInfo,
                onSale,
                priceDrop,
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
