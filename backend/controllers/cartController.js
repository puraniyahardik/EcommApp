import userModel from '../models/userModel.js'





// Add product to user Cart

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById( userId );
        
        let cartData = await userData.cartData ;


        if (cartData[userId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] =  cartData[itemId][size] + 1
            }
            else {

                cartData[itemId][size] = 1
            }

        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1

        }


        await userModel.findByIdAndUpdate(userId, { cartData });


        res.json({ succes: true, message: 'added To cart' })



    } catch (error) {
        console.log(error);
        res.json({ succes: false, message: error.message })


    }

}



// update product and user Cart

const updateCart = async (req, res) => {

    try {

        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId );
        let cartData = await userData.cartData;


        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ succes: true, message: 'Update the Cart.......' })



    } catch (error) {

        console.log(error);
        res.json({ succes: false, message: error.message })


    }

}



// get  user Cart data

const getUserCart = async (req, res) => {


    try {

        const { userId } = req.body;

        const userData = await userModel.findById( userId );
        let cartData = await userData.cartData;


        res.json({ succes: true, cartData })


    } catch (error) {

        console.log(error);
        res.json({ succes: false, message: error.message })


    }

}
export { addToCart, getUserCart, updateCart };