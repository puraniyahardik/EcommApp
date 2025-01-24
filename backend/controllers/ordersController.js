


//place order using COD Method [cash on delivery]

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import razorpay from 'razorpay';


//global variable 

const currency = 'inr';
const deliveryCharge = 10;

//Gateway initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//Razorpay
const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
});

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        //after creating order clear the cart dtata
        await userModel.findByIdAndUpdate(userId, { cartData: {} });


        res.json({ success: true, message: 'Order Placed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });


    }
}



//place order using stripe

const placeOrderStripe = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100,
            },
            quantity:item.quantity,
        }));

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:deliveryCharge * 100
            },
            quantity:1,
        });

        //creating session for payment 
        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
        });

        res.json({success:true,session_url:session.url});



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });


    }

};


//Verify Stripe payments

const verifyStripe  = async (req,res) => {
    
    const {orderId,success,userId} = req.body;

    try {

        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});

            //after verify payment clear the cartdata of the user
            await userModel.findByIdAndUpdate(userId,{cartData:{}});

            
            res.json({ success: true});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false});
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}



//place order using Razorpay Method

const placeOrderRazorpay = async (req, res) => {
    
    try {

        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        //create option

        const options = {
            amount:amount * 100,
            currency:currency.toUpperCase(),
            receipt:newOrder._id.toString()
        }

    //    await razorpayInstance.orders.create(options,(error,order)=>{
    //     if (error) {
    //         console.log(error);
    //         res.json({ success: false, message: error });
            
    //     }
    //     res.json({success:true,order});

    //    })

    //crate order
    const razorpayOrder = await razorpayInstance.orders.create(options);

    res.json({success:true,order:razorpayOrder})


 

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });


    }
}
//Verify Razorpay payments

const verifyRazorpay = async (req,res) => {

    
    
    try {
        const {orderId,razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        // console.log(orderInfo);

        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});

            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            
             res.json({success:true,message:'payment succesFully'})
             
            }else{
                
                res.json({success:false,message:'payment failed'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}




//All Order data for Admin Panel

const allOrder = async (req, res) => {

    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}


//User Order data for frontend

const userOrder = async (req, res) => {

    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });

        res.json({ success: true, orders })

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message });


    }

}


//update status from Admin only can change it.......
const updateStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });


        res.json({ success: true, message: 'Status Upadted' });
        // console.log();


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}


export {
    placeOrder,
    placeOrderRazorpay,
    placeOrderStripe,
    updateStatus,
    allOrder,
    userOrder,
    verifyStripe,
    verifyRazorpay
}