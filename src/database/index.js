import mongoose from "mongoose";

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectToDB = async () => {
    const connectionUrl =
        "mongodb+srv://dinhnguyenminhhoang28:281023@cluster0.87ogcpu.mongodb.net/";

    mongoose
        .connect(connectionUrl, configOptions)
        .then(() => console.log("Ecommerce database connected successfully!"))
        .catch((err) =>
            console.log(`Getting Error from DB connection ${err.message}`)
        );
};

export default connectToDB;
