const express = require("express");
const morgan = require("morgan");
require('dotenv').config()

const app = express();

app.use(morgan("dev"));

app.listen(process.env.PORT || 80, () => {
  console.log(`Listening at.... http://localhost:${process.env.PORT || 80}`);
});




app.get("/", (req, res) => {
  res.send("<h1>OOP Project LinkedList</h1>");
});

app.use((req, res) => {
  res.send("Not Found");
});
