const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const connectDB = require('./db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)

        
        console.log(`Data Imported`)

    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

const deleteData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        console.log(`Data Deleted`)

    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

if(process.argv[2] === '-d') {
    deleteData()
} else {
    importData()
}