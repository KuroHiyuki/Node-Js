import bcrypt from 'bcryptjs';
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let CreateNewUser = async (data) => {
    return new Promise (async(resolve,reject) => {
        try {
            let CryptoPass = await HashPassword(data.password);
            await db.User.create({
                password: CryptoPass,
                firstName: data.firstName,
                lastName:data.lastName,
                email: data.email,
                gender: data.sex === '1' ? true:false,
                roleId: data.RoleId,
                phone: data.phone,
                address: data.address
            })
            resolve('Successed!');
        } catch (error) {
            reject(error);
        }
    })
}

let HashPassword =(pass) => {
    return new  Promise (async(resolve, reject) => {
        try {
            let hashPass = await bcrypt.hashSync(pass, salt);
            resolve(hashPass);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    CreateNewUser:CreateNewUser,
}