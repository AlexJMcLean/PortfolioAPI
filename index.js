import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import contactRoutes from "./routes/contact.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();
const route = express.Router();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/contact", contactRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));
