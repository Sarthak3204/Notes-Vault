import express from "express";
import {
  getBlog,
  allBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect } from '../middleware/authMiddleware.js';
// import upload from '../config/multer.js';

const router = express.Router();

router.route("/create").post(protect, createBlog);
// router.route("/create").post("/upload", upload.single("file"), protect, createBlog);
router.route("/all").get(protect, allBlogs);
router.route("/:id")
  .get(protect, getBlog)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;