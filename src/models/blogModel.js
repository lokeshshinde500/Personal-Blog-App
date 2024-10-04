import mongoose from "mongoose";
import multer from "multer";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },

  description: { type: String, required: true, trim: true },

  category: { type: String, required: true, trim: true },

  image: { type: String, required: true },

  created_at: { type: String, required: true },

  updated_at: { type: String, required: true },

  created_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

// for image
const storage = multer.diskStorage({});
export const upload = multer({ storage: storage }).single("image");

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;
