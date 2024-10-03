import moment from "moment";
import blogModel from "../models/blogModel.js";
import { uploadImage } from "../utils/uploadImage.js";

// create new blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // All fields are required
    if (!title || !description || !category) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const image = req.file;

    // for image
    if (!image) {
      return res.status(400).json({
        message: "Please, Upload blog image!",
        success: false,
      });
    }

    const result = await uploadImage(req.file.path);

    const date = moment().format("LLL");

    const newBlog = {
      title,
      description,
      category,
      image: result.secure_url,
      created_at: date,
      updated_at: date,
      created_by: req.user.id,
    };

    const createBlog = await blogModel.create(newBlog);

    return res.status(201).json({
      message: "Blog created successfully.",
      blog: createBlog,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error! create blog", success: false });
  }
};

// get all blog
export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({ created_by: req.user.id });

    if (!blogs) {
      return res.status(400).json({
        message: "Blos not found!",
        success: false,
      });
    }

    return res.status(200).json({
      blogs: blogs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error! get blogs", success: false });
  }
};

// get single blog by id
export const getBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).populate({
      path: "created_by",
      ref: "User",
      select: "-password",
    });

    if (!blog) {
      return res.status(400).json({
        message: "Blog not found!",
        success: false,
      });
    }

    return res.status(200).json({
      blog: blog,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error! get blog", success: false });
  }
};

// delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      return res.status(400).json({
        message: "Blog not found!",
        success: false,
      });
    }

    await blogModel.findByIdAndDelete(req.params.id);

    return res.status(403).json({
      message: "Blog deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error! delete blog", success: false });
  }
};

// update blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      return res.status(400).json({
        message: "Blog not found!",
        success: false,
      });
    }

    const { title, description, category } = req.body;
    const image = req.file;

    let result = { secure_url: blog.image };
    if (image) result = await uploadImage(image.path);

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.category = category || blog.category;
    blog.image = result.secure_url;
    blog.updated_at = moment().format("LLL");

    const updatedBlog = await blog.save();

    return res.status(201).json({
      message: "Blog updated successfully.",
      blog: updatedBlog,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! Update blog",
      success: false,
    });
  }
};
