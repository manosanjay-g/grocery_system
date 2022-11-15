const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const adminRouter = require("./routers/admin_router");
const userRouter = require("./routers/user_router");
const authRouter = require("./routers/auth_router");

const connectDB = require("./configs/database_config");

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on PORT ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
