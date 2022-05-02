import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
//app.use("/api/products", productRouter);
//test
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

// app.get("/api/product/slug/:slug", (req, res) => {
//   const product = data.products.find((x) => x.slug === req.params.slug);
//   console.log("product", product);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product Not Found" });
//   }
//   //res.send(data.products);
// });
if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
