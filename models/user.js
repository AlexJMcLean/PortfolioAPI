import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  role: { type: String },
});

const user = mongoose.model("User", userSchema);

export default user;
