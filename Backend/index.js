const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const auth = require("./middlewares/auth");
const websiteRouter = require("./routes/website");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}))
 
app.use("/api/v0/auth", authRouter);
app.use("/api/v0/user", auth, userRouter);
app.use("/api/v0/website", websiteRouter);
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server Started!");
    });
  })
  .catch((err) => {
    console.error("Error : database connection failure");
  });
