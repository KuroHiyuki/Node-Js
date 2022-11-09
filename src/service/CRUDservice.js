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

let GetAllUser =() => {
    return new  Promise (async(resolve, reject) => {
        try {
            let TableUser = await db.User.findAll({
                raw: true,
            })
            resolve(TableUser);
        } catch (error) {
            reject(error);
        }
    })
}

let GetData = (data) => {
    return new  Promise (async(resolve, reject) => {
        try {
            let InfoUser = await db.User.findAll({
                raw: true,
                where: {
                    Id:data,
                }
            })
            if (InfoUser) {
                resolve(InfoUser);
            } else {
                resolve([]);
            };
        } catch (error) {
            reject(error);
        }
    })
}
let DeleteData = (Userid) => {
    return new  Promise (async(resolve, reject) => {
        try {
            let InfoUser = await db.User.destroy({
                raw: true,
                where: {
                    Id:Userid,
                }
            })
            if (InfoUser) {
                resolve(InfoUser);
            } else {
                resolve([]);
            };
        } catch (error) {
            reject(error);
        }
    })
}
let EditData = (Userid) => {
    return new  Promise (async(resolve, reject) => {
        try {
            let InfoEdit = await db.User.update({
                firstName: Userid.firstName,
                lastName: Userid.lastName,
                gender: Userid.sex,
                roleId: Userid.RoleId,
                phone: Userid.phone,
                address: Userid.address,
                updatedAt: Date(),
            },{
                raw: true,
                where: {
                    Id:Userid.ID,
                }
            })
            if (InfoEdit) {
                resolve(InfoEdit);
            } else {
                resolve({});
            };
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    CreateNewUser:CreateNewUser,
    GetAllUser: GetAllUser,
    DeleteData: DeleteData,
    EditData: EditData,
    GetData:GetData,
}