import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
        },
        comment: String,
        replies: [
            {
                commentID: String,
                commentReply: String,
                userID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    { timestamps: true }
);

const Comment =
    mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
