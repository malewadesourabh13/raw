const express = require('express');
const dotenv = require('dotenv');
/* const products = require('./data/products'); */
const cors = require('cors');

const connectDB = require('./db');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json())

//study cors
app.use(cors({origin:'http://localhost:3000'}))


app.get('/', (req, res) => {
    res.send(`Hello from server`);
})

app.use('/products', productRoutes)
app.use('/users', userRoutes)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})