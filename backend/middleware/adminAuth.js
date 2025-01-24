import jwt from 'jsonwebtoken';


const adminAuth = async (req,res,next) =>{
    try {
        const {token} = req.headers;
        if (!token) {
            return res.json({succes:false,messege:"Not authorized"});
        }
        //decode token
        const token_decode  = jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({succes:false,messege:"Not authorized login"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.json({succes:false,messege:error.messege})
    }
}

export default adminAuth;