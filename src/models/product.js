import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        category: String,
        type: String,
        sizes: Array,
        colors: Array,
        deliveryInfo: String,
        onSale: String,
        priceDrop: Number,
        imageUrl: String,
        thumbnailUrl: String,
        rate: String,
    },
    { timestamps: true }
);

const Product =
    mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
