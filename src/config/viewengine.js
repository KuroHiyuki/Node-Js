import express from "express";

let viewEngine =(app) => {
    app.use(express.static("./src/public"));
    app.set("View engine",'ejs'); // tác dụng của view engine là sử dụng các câu lệnh if else switch hay các vòng lặp
    app.set("views","./src/views");
}
module.exports = viewEngine;