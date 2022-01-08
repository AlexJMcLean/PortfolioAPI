import PostBlog from "../models/postBlog.js";

export const getPosts = async (req, res) => {
  try {
    const postBlogs = await PostBlog.find();

    console.log(postBlogs);
    res.status(200).json(postBlogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const body = req.body();
  const newPost = new PostBlog(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
