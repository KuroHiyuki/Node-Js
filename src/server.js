import express from "express";
import bodyparser from "body-parser";
import viewEngine from "./config/viewengine";
import initRouter from  "./route/web";
import connect from "./config/connectDB";

require('dotenv').config();

let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

viewEngine(app);
initRouter(app);

connect();
let port = process.env.PORT || 6969; // khi port == undifined => port =  6969;

app.listen(port,  () => {
    console.log("Backend node Js is running port:" + port);
});


