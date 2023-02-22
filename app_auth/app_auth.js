const express = require('express');
const { sequelize, User } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));
// npm install express
// npm install sequelize mariadb
// npm install --save-dev sequelize-cli
// npx sequelize init


// app.post('/register', (req, res) => {

//     const obj = {
//         name: req.body.name,
//         email: req.body.email,
//         role: req.body.role,
//         password: bcrypt.hashSync(req.body.password, 10)
//     };

//     User.create(obj).then( rows => {
        
//         const usr = {
//             userId: rows.id,
//             user: rows.name
//         };

//         const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

//         console.log(token);
        
//         res.json({ token: token });

//     }).catch( err => res.status(500).json(err) );
// });

app.post('/login', (req, res) => {

    User.findOne({ where: { name: req.body.name } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name,
                    role: usr.role
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                console.log(token);
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});