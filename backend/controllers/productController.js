
import {v2 as cloudinar} from 'cloudinary';
import productModel from '../models/productModel.js';


//fun for add product
const addProduct  = async (req,res) =>{
    
    try {
        //fromm body get product details
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestsaller,
            image,
            date
        } = req.body;
            //we get the images
        const image1 =req.files.image1 && req.files.image1[0];
        const image2 =req.files.image2 && req.files.image2[0];
        const image3 =req.files.image3 && req.files.image3[0];
        const image4 =req.files.image4 && req.files.image4[0];

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinar.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        );

        const productData = {
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            //converting to boolean
            bestsaller:bestsaller === 'true' ? true:false,
            //array is not send to direct form to use json parse to convert to array to string 
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }

    //     console.log( name,
    //         description,
    //         price,
    //         category,
    //         subCategory,
    //         sizes,
    //         bestsaller);
    //  console.log(imagesUrl);
     console.log(productData);

     const product = new productModel(productData);
     await product.save();


    res.json({succes:true,meesage:'Product Added.....'});
     
     
     
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message});
        
    }
}


//fun for list product
const listProduct  = async (req,res) =>{
    try {
        const products = await productModel.find({});
        res.json({succes:true,products});
        
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message});
    }
}


//fun for adremoved product
const removeProduct  = async (req,res) =>{
    try {
        await productModel.findByIdAndDelete(req.body.id);

        res.json({succes:true,message:'product removed'});
        
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message});
    }
}


//fun for single product info
const singleProduct  = async (req,res) =>{

    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);

        res.json({succes:true,product});
        
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message});
    }
}


export {
    listProduct,
    addProduct,
    removeProduct,
    singleProduct
}