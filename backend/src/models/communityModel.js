import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  insta: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  description: String,
  tags: [String],
}, { timestamps: true });

const Community = mongoose.model("Community", communitySchema);
export default Community;
