import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostBlog = mongoose.model("postBlog", postSchema);

export default PostBlog;
