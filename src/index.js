import express from "express";
import cors from "cors";

import constant from "./config/constant.js";
import db from "./config/db.js";
import indexRoutes from "./routes/indexRoutes.js";

const app = express();
const port = constant.PORT;

// cors middleware
app.use(cors({
  origin: '*',
}));

// parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create server
app.listen(port, (error) => {
  if (error) {
    console.error("Server not connected!");
  } else {
    console.log(`Server running on ${port} :)`);
    db();
  }
});

// routing
app.use("/api/v1", indexRoutes);
