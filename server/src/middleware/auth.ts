import jwt from "jsonwebtoken"

export const Verifytoken = async (req, res, next)=>{
    try {
        // Lấy jwt từ header
        const token = req.header("Authorization")

        //Kiểm tra token có tồn tại không
        if(!token) return res.status(400).json({msg: "Access Denied."})

        //Xác thực token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
            //Không hợp lệ
            if(err) return res.status(400).json({msg : "Invalid Authorization"})
            
            //Hợp lệ
            req.user = user
            next()
        })
    } catch (err) {
        res.status(500).json({msg : err.message})
    }
}