import jwt from 'jsonwebtoken';


const authUser = async (req,res,next) => {

    const {token} = req.headers;

    if (!token) {
        return res.json({success:false,message:'Not authrized Login again'});
    }


    try {

        const toket_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = toket_decode.id;


        next();
        
    } catch (error) {
        console.log({error});
        return res.json({success:false,message:error.message});
        
    }

}


export default authUser;