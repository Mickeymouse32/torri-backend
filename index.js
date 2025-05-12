require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { route } = require("./routes/userRouter");
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRouter");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Tori Gate Server" });
});

app.use("/api/auth", userRouter);

//error route

app.use((req, res) => {
  res.status(400).json({ success: false, message: "ROUTE NOT FOUND" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "toriigate" });
    app.listen(PORT, () => {
      console.log(`App running on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
