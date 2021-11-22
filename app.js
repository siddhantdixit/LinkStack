const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
require('dotenv').config()

const app = express();

app.use(morgan("dev"));

app.set('json spaces', 2)

app.listen(process.env.PORT || 80, () => {
  console.log(`Listening at.... http://localhost:${process.env.PORT || 80}`);
});




app.get("/", async (req, res) => {
  let startDate = new Date();
  const response = await axios.get('/api/info');
  let endDate = new Date();

  let mypage = ``;
  mypage+=`---- START TIME = ${startDate.toISOString()} <br>`;
  mypage+=`---- END TIME= ${endDate.toISOString()} <br>`;
  mypage+=`RESPONSE TIME = ${endDate - startDate} <br><br><br>`;


  mypage+=`Path /api/info <br><br>`;
  mypage+=`Data <br><br>`;
  mypage+=`${response.data}`;
  res.send(mypage);
});

app.get("/api/info",(req,res)=>{
  res.send('OOP Project LinkedList');
});

app.use((req, res) => {
  res.send("Not Found");
});
