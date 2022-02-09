const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Sourabh Malewade',
        email: 'sourabh@gmail.com',
        paid: true,
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: 'Shreya Malewade',
        email: 'shreya@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: 'Mahadev Malewade',
        email: 'mahadev@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: 'Vijayalaxmi Malewade',
        email: 'vijaya@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: 'Savni Thakur',
        email: 'savni@gmail.com',
        paid: true,
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: 'Bhavya Lakhani',
        email: 'bhavya@gmail.com',
        password: 123,
        
    },
    
]
module.exports = users;