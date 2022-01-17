import mongoose from "mongoose";
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
  const { title, slug, image, imageAlt, snippet, body, date } = req.body;
  const newPost = new PostBlog({
    title,
    slug,
    image,
    imageAlt,
    snippet,
    body,
    date,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectID.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostBlog.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};
