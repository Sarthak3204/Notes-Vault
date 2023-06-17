import express from "express";
import { createBlog, updateBlog, deleteBlog, getBlogs } from "../controllers/blogController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/create").post(protect, createBlog);
router.route("/:id")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);
router.route("/get").get(protect, getBlogs);

export default router;