const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

//connect our database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/user"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
