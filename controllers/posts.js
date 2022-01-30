import mongoose from "mongoose";
import PostBlog from "../models/postBlog.js";
import findUserRole from "../utils/findUserRole.js";

export const getPosts = async (req, res) => {
  try {
    const postBlogs = await PostBlog.find();

    res.status(200).json(postBlogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { slug } = req.params;
  const blog = await PostBlog.find({ slug });
  console.log(blog);
};

export const createPosts = async (req, res) => {
  const userRole = await findUserRole(req.userId);

  if (userRole !== "admin")
    return res.status(401).json({ message: "Unauthorized" });
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
  const userRole = await findUserRole(req.userId);

  if (userRole !== "admin")
    return res.status(401).json({ message: "Unauthorized" });

  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostBlog.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const userRole = await findUserRole(req.userId);

  if (userRole !== "admin")
    return res.status(401).json({ message: "Unauthorized" });
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  await PostBlog.findByIdAndRemove(_id);

  res.json({ message: "Post deleted successfully" });
};
