import express from "express";
import bodyparser from "body-parser";
import viewEngine from "./config/viewengine";
import initRouter from  "./route/web";
import connect from "./config/connectDB";
import cors from 'cors'
require('dotenv').config();

let app = express();
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

viewEngine(app);
initRouter(app);


connect();
let port = process.env.PORT || 8080; // khi port == undifined => port =  6969;

process.env.TZ; // UTC +00:00
// console.log(new Date().toString())

app.listen(port,  () => {
    console.log("Backend node Js is running port:" + port);
});


