import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
/*
descr:  create blog
route:  POST api/blog/create
access: PRIVATE
*/
const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);

  if (blog) {
    res.status(201).json({//201 Created
      _id: blog._id,
      userId: blog.userId,
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
    });
  }
  else {
    res.status(400);//400 Bad Request
    throw new Error('Bad Blog');
  }
});
/*
descr:  Update blog
route:  PUT api/blog/update
access: PRIVATE
*/
const updateBlog = asyncHandler(async (req, res) => {
  const { title, summary, content } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    if (title !== "") blog.title = title;
    if (summary !== "") blog.summary = summary;
    if (content !== "") blog.content = content;

    const updatedBlog = await blog.save();

    res.status(200).json({
      _id: updatedBlog._id,
      userId: updateBlog.userId,
      title: updatedBlog.title,
      summary: updatedBlog.summary,
      content: updatedBlog.content,
    });
  }
  else {
    res.status(404);
    throw new Error("Blog not found");
  }
});
/*
descr:  delete blog
route:  DELETE api/blog/delete
access: PRIVATE
*/
const deleteBlog = asyncHandler(async (req, res) => {
  const result = await Blog.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 1) {
    res.status(200).json({ message: "Deleted successfully" });
  }
  else {
    res.status(404);
    throw new Error("Blog not found");
  }
});
/*
descr:  get all blog
route:  get api/blog/all
access: PRIVATE
*/
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
});

export {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
};