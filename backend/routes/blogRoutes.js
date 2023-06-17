import express from "express";
import { getBlog, createBlog, updateBlog, deleteBlog, allBlogs } from "../controllers/blogController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/create").post(protect, createBlog);
router.route("/all").get(protect, allBlogs);
router.route("/:id")
  .get(protect, getBlog)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;