import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
  return new Promise(async (resovle, reject) => {
    try {
      let userData = {};
      let isExist = await checkEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes:['email','password','roleId'],
            where: {email:email},
            raw: true
        })
        if(user) {
          let check = await bcrypt.compareSync(password, user.password);
          if(check) {
            userData.errCode= 0;
            userData.errMessage= "Đăng nhập thành công";
            delete user.password;
            console.log(user);
            userData.user = user;
          }else{
            userData.errCode =3;
          userData.errMessage= "Sai mật khẩu";
          }
        }else {
          userData.errCode =2;
          userData.errMessage= "Email không tồn tại";
          
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Không tồn tại Email`;
        
      }
      resovle(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let checkEmail = (userEmail) => {
  return new Promise(async (resovle, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resovle(true);
      } else {
        resovle(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
};
