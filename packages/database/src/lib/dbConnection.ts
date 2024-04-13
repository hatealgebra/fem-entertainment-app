import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/web-app"
    );
    return connection;
  } catch (e) {
    console.error(e);
  }
};

export default dbConnect;
