import { Request, Response } from "express";
import { nextTick } from "process";
import User from "../models/User";

const UserController = {
    //Đăng nhập
    login : async(req : Request, res : Response) => {
        try {
              const {email, password} = req.body

            // Kiểm tra có tài khoản nào có tên tài khoản đó ko 
            const user = await User.findOne({email})
            
            //Không có thì trả về status 400 và thông báo tài khoản không tồn tại
            if(!user) return res.status(400).json({msg:"User not exists. "})

            // Nếu tài khoản tồn tại thì kiểm tra mật khẩu không đúng thì trả về status 400 và thông báo mật khẩu không đúng
            if(user.password != password) return res.status(400).json({msg : "Password not correct. "})
            res.json(user)
        } catch (err) {
            if (err instanceof Error) {
                // ✅ TypeScript knows err is Error
                return res.status(500).json({msg :err.message})
            } else {
                console.log('Unexpected error', err);
            }
           
        }
      
    },

    // Tạo tài khoản 
    register : async(req : Request, res : Response) => {
        try {
            const user = new User({
                FirstName: req.body.FirstName,
                LastName : req.body.LastName,
                email: req.body.email,
                avatar: req.body.avatar,
                password: req.body.password
            });
            const newUser = await user.save();
            res.json(newUser)
        } catch (err) {
            if (err instanceof Error) {
                // ✅ TypeScript knows err is Error
                return res.status(500).json({msg :err.message})
            } else {
                console.log('Unexpected error', err);
            }
           
        }
       

    },

    // Xóa tài khoản 
    delete : async (req : Request, res : Response) => {
        try {
            await User.findByIdAndDelete(req.params.id)

            res.json({msg : "User Deleted."})
        } catch (err) {
            if (err instanceof Error) {
                // ✅ TypeScript knows err is Error
                return res.status(500).json({msg :err.message})
            } else {
                console.log('Unexpected error', err);
            }
        }
    },

    //Cập thông tin tài khoản 
    update : async (req : Request, res : Response) => {
        try {
            const {email, FirstName, LastName, password} = req.body

            const newuser = await User.findByIdAndUpdate({_id : req.params.id} , {email, FirstName, LastName, password})

            res.json({msg : 'User Updated.'})
        } catch (err) {
             if (err instanceof Error) {
                // ✅ TypeScript knows err is Error
                return res.status(500).json({msg :err.message})
            } else {
                console.log('Unexpected error', err);
            }
        }
       
    },

    //Xem thông tin cá nhân 

    info :async(req : Request, res : Response) => {
        try {
            const user = await User.findById(req.params.id)

            //Không có thì trả về status 400 và thông báo tài khoản không tồn tại
            if(!user) return res.status(400).json({msg:"User not exists. "})

            res.json(user)

        } catch (err) {
            if (err instanceof Error) {
                // ✅ TypeScript knows err is Error
                return res.status(500).json({msg :err.message})
            } else {
                console.log('Unexpected error', err);
            }
        }
        
    }
}

module.exports = UserController