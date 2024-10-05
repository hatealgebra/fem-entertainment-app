import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_DB_URI as string
    );
    return connection;
  } catch (e) {
    console.error(e);
  }
};

export default dbConnect;
