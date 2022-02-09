const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI) ;
        
        console.log(`MongoDB Connected`)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = connectDB;