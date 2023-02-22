import userLoginSerive from "../service/userLoginService"

let handleLogin = async(req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: `Missing`
        })
    }
    let userData = await userLoginSerive.handleUserLogin(email,password);
    return res.status(200).json({
        // errCode: userData.errCode,
        // errMessage: userData.errMessage,
        userData
    })

}
module.exports = {
    handleLogin:handleLogin
}