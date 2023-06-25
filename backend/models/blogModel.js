import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  file: String,
}, {
  timestamps: true
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;