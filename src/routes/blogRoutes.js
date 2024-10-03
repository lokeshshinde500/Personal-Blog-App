import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import { upload } from "../models/blogModel.js";
const routes = Router();

// create new blog
routes.post("/", upload, createBlog);

// get all blogs
routes.get("/", getBlogs);

// get single blog
routes.get("/:id", getBlog);

// delete blog by id
routes.delete("/:id", deleteBlog);

// update blog by id
routes.patch("/:id", upload, updateBlog);

export default routes;
