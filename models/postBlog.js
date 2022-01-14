import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  image: String,
  imageAlt: String,
  snippet: String,
  body: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostBlog = mongoose.model("postBlog", postSchema);

export default PostBlog;
