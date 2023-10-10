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
        .then(() => console.log("database connecting successfully"))
        .catch((errr) => console.log("getting error from db connection", errr));
};
export default connectToDB;
