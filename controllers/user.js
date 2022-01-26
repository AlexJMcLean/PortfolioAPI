import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { name, password } = req.body;
  try {
    const existingUser = await User.findOne({ name });
    if (!existingUser)
      return res.status(404).json({ message: "User doesnt exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.name, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { name, password, confirmPassword } = req.body;

  const existingUser = await User.findOne({ name });

  if (existingUser)
    return res.status(400).json({ message: "User already exists." });

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  const hashPassword = await bcrypt.hash(password, 12);

  const result = await User.create({ name, password: hashPassword });
  const token = jwt.sign(
    { email: result.name, id: result._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ result: existingUser, token });
};
