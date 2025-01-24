import userModel from "../models/userModel.js";
import validatore from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//token gen

const createToken  = (id) =>{
    
    return jwt.sign({id},process.env.JWt_SECRET)
}


//routes for user login
const loginUser = async (req,res)=>{

    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({succes:false,message:"User does not exists"});
        }
           
        //matching password to mongodb
        const isMatch = await bcrypt.compare(password,user.password);

        if (isMatch) {
            //generating token for login
            const token = createToken(user._id);
            res.json({succes:true,token})
        }else{
            res.json({success:false,message:'invalid password'});
        }
    } catch (error) {
        console.log({error});
        res.json({succes:false,message:error.message })
    }

}


//routes for user register
const registerUser = async (req,res)=>{
    //testing
    // res.json({msg: 'api working'})

    try {
        const {name,email,password} = req.body;
 
        //checking user already exists or not 
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({succes:false,message:"user already exists"}) 
        }


        //validating email formate & strong password
        if (!validatore.isEmail(email)) {
            return res.json({succes:false,message:"email is invalid"}) 
            
        }

        if (password.length < 8) {
            return res.json({succes:false,message:"Pleace enter a strong password"}); 
        }

        //hashing user password

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);



/// generating new user using save() mwthod
        const newUser = new userModel({
            name,
            email,
            password:hashedPass ,
        });
        const user = await newUser.save();

        // token useed to login
        const token = createToken(user._id);

        res.json({succes:true,token })

    } catch (error) {
        console.log({error});
        res.json({succes:false,message:error.message })
    }
}

//Routes for Admin Login

const adminLogin = async (req,res) =>{

    try {
        const {email,password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
            const token = jwt.sign(email+password,process.env.JWt_SECRET);    
        res.json({succes:true,token});
        } 
        else{
            res.json({succes:false,message:"invalid Credentials"});
        }
    } catch (error) {
        console.log({error});
        res.json({succes:false,message:error.message });
    }
}

export {loginUser,registerUser,adminLogin}