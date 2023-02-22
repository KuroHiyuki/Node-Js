
import express from "express";
import Controller from  "../Controller/homecontroller"
import userController from "../controller/userController"
let router = express.Router();

let initwebRouter = (app) => {
    router.get('/',Controller.Homepage);
    router.get('/register',Controller.PostRegister);
    router.post('/post-data',Controller.Postdata);
    router.get('/display',Controller.displayCRUD);
    router.get('/edit',Controller.GetCRUD);
    router.post('/update',Controller.EditCRUD);
    router.get('/delete',Controller.DeleteCRUD);
    router.post('/api/login',userController.handleLogin)

    return app.use("/",router);
}
module.exports = initwebRouter;