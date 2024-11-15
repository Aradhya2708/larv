import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: String,
  memberOf: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
  modOf: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
