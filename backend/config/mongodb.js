import mongoose from 'mongoose';


const connectDB= async ()=>{
  await  mongoose
  .connect(process.env.MONGODB_URL)
  .then((e)=> console.log('MongoDb connected.....')) 
  .catch((e)=> console.log(e))  
}
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL);

//         mongoose.connection.on('connected', () => {
//             console.log('DB Connected');
//         });

//         mongoose.connection.on('error', (err) => {
//             console.error('MongoDB connection error:', err.message);
//         });
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error.message);
//         process.exit(1); // Exit process with failure
//     }
// };

export default connectDB;
