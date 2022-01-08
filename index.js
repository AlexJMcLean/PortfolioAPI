import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import contactRoutes from "./routes/contact.js";

const app = express();
dotenv.config();
const route = express.Router();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
