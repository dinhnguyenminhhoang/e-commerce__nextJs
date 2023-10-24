import mongoose from "mongoose";

const PosterSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        imageUrl: String,
    },
    { timestamps: true }
);

const Poster =
    mongoose.models.Posters || mongoose.model("Posters", PosterSchema);

export default Poster;
