import express from 'express';
import { allOrder, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrder, verifyRazorpay, verifyStripe } from '../controllers/ordersController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js';
const orderRoutes = express.Router();

//admin features......
orderRoutes.post('/list',adminAuth,allOrder);//for admin panel
orderRoutes.post('/status',adminAuth,updateStatus);//for admin panel

//Payment features

//COD
orderRoutes.post('/place',authUser,placeOrder);
//stripe
orderRoutes.post('/stripe',authUser,placeOrderStripe);
//razorepay
orderRoutes.post('/razorpay',authUser,placeOrderRazorpay);



//verify payment
orderRoutes.post('/verifyStripe',authUser,verifyStripe)
orderRoutes.post('/verifyRazorpay',authUser,verifyRazorpay)


//User features

orderRoutes.post('/userorders',authUser,userOrder);


export default orderRoutes;