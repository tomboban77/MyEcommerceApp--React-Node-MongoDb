const express = require("express");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userAuthRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

//apply middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

//Call DB
connectDB();

//routes
app.use("/api/products", productRoutes);
app.use("/api/users", userAuthRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//To make folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is  running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
