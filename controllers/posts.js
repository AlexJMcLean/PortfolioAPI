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
  const { title, image, snippet, body, date } = req.body;
  const newPost = new PostBlog({ title, image, snippet, body, date });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
