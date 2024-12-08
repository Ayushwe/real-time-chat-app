const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const AuthRoute = require("./Routes/Auth");
const MessageRoute=require('./Routes/message');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/auth', AuthRoute);
app.use('/message', MessageRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
