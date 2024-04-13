import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("Connected");
  } catch (e) {
    console.error(e);
  }
};

connect();
