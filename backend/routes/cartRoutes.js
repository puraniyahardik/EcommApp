import express, { Router } from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';


const cartRoutes = express.Router();

cartRoutes.post('/get',authUser,getUserCart);
cartRoutes.post('/add',authUser,addToCart);
cartRoutes.post('/update',authUser,updateCart);

export default cartRoutes; 