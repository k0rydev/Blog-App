const express = require("express");
const cors = require("cors");

// Database requirements
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

const cookieParser = require("cookie-parser");

// Routes requirements
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

// Use cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Upload path
app.use("/uploads", express.static(__dirname + "/uploads"));

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://phamtruc-work:phamtruc-work@cluster0.nhzjq83.mongodb.net/?retryWrites=true&w=majority"
);

app.use(userRoutes);
app.use(postRoutes);

app.listen(4000);
