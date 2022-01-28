import express from "express";

import { signin, signup, demo } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/demo", demo);

export default router;
