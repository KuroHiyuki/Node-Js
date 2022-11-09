import db from "../models/index";
import  CRUDservice from '../service/CRUDservice';


let Homepage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs',{data:JSON.stringify(data)});
    } catch (error) {
        console.log(error);
    }
}

let PostRegister = async(red,res) => {
    try {
        return res.render('register.ejs');
    } 
    catch (error) {
        console.log(error);
    }
}

let Postdata = async(req, res) => {
    let message = await CRUDservice.CreateNewUser(req.body);
    console.log(message);
    console.log(req.body);
    return res.render('homepage.ejs');
}
module.exports = {
    Homepage : Homepage,
    PostRegister : PostRegister,
    Postdata: Postdata,
}