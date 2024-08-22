import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n mongoDB connected. host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("error: ", error);
    process.exit(1);
  }
};

export default connectDB;
