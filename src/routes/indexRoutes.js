import { Router } from "express";
import authRoutes from "./authRoutes.js";
import blogRoutes from "./blogRoutes.js";
import { authenticate } from "../middleware/authenticate.js";
const routes = Router();

// user routes
routes.use("/auth", authRoutes);

// blog routes
routes.use("/blog", authenticate, blogRoutes);

export default routes;
