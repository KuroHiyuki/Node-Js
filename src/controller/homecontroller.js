import { json } from "sequelize";
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
    return res.redirect('/');
}

let displayCRUD = async(req,res) => {
    return new Promise (async(resolve, reject) => {
        try {
            let table = await CRUDservice.GetAllUser();
            return res.render('dislayCRUD.ejs',{table});

        } catch (error) {
            reject(error);
        }
    })
}

let GetCRUD = async (req,res) => {
    let UserId = req.query.id;
    console.log('Editing... '+ UserId);
    if (UserId) {
        let DataId = await CRUDservice.GetData(UserId);
        console.log(DataId);
        return res.render('EditCRUD.ejs',{DataEdit:DataId});
    } else {
        return res.send("User not found!");
    }
}

let EditCRUD = async (req,res) => {
    let UserId = req.body;
    console.log('User has been updated! ');
    if (UserId) {
        let DataId = await CRUDservice.EditData(UserId);
        console.log(DataId);
        return res.redirect('/display');
    } else {
        return res.send("User not found!");
    }
}

let DeleteCRUD = async (req,res) => {
    let UserId = req.query.id;
    console.log('User has been deleted! '+UserId);
    if (UserId) {
        await CRUDservice.DeleteData(UserId);
        return res.redirect('/display');
    } else {
        return res.send("User not found!");
    }
}

module.exports = {
    Homepage : Homepage,
    PostRegister : PostRegister,
    Postdata: Postdata,
    displayCRUD: displayCRUD,
    EditCRUD:EditCRUD,
    DeleteCRUD: DeleteCRUD,
    GetCRUD:GetCRUD,
}