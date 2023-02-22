const express = require("express");
const { sequelize, User } = require("../models");
const Joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: "Token is null" });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });

        if(user.role !== 'admin') return res.status(403).json({ msg: "Admin only" });
    
        req.user = user;
    
        next();
    });
}

// route.use(authToken);

route.get("/", async (req, res) => {
    try{
        const users = await User.findAll();
        return res.json(users);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async(req, res) => {
    console.log(req.body)
    const shema = Joi.object().keys({
        name: Joi.string().trim().min(2).max(12).required(),
        email: Joi.string().trim().email().required(),
        role: Joi.string().default("user").required(),
        watchlistId: Joi.number().allow(null),
        password: joiPassword
                        .string()
                        // .minOfSpecialCharacters(1)
                        .minOfLowercase(2)
                        // .minOfUppercase(1)
                        // .minOfNumeric(1)
                        .noWhiteSpaces()
                        .required(),
    });
    const {error, succ} = shema.validate(req.body);
    if(error){
        res.status(403).json({ msg: error.details[0].message});
    } else {
        const obj = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: bcrypt.hashSync(req.body.password, 10)
        };
        User.create(obj)
        .then( rows => {
            const usr = {
                userId: rows.id,
                user: rows.name
            };
            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
            console.log(token);
            res.json({ token: token });
    
        }).catch( err => res.status(500).json(err) );
        // User.create(req.body)
        //     .then( rows => res.json(rows) )
        //     .catch( err => res.status(500).json(err) );
    }
});

route.delete("/:id",  async (req,res) => {
    try{
        const data = await User.findByPk(req.params.id);
        data.destroy();
        return res.json( data.id );
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


const { Op } = require("sequelize");
route.get("/find/:q", async (req, res) => {
    try{
        let data = await User.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.substring]: req.params.q
                    },
                    email: {
                        [Op.substring]: req.params.q
                    },
                }
            }
        });
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });

route.get("/:id", async (req, res) => {
    try{
        let data = await User.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });

route.put("/edit/:id", async(req, res) => {
    console.log(req.body)
    const shema = Joi.object().keys({
        name: Joi.string().trim().min(2).max(12).required(),
        email: Joi.string().trim().email().required(),
        role: Joi.boolean().default(false).required(),
        watchlistId: Joi.number().allow(null),
        password: joiPassword
                        .string()
                        .minOfSpecialCharacters(1)
                        .minOfLowercase(2)
                        .minOfUppercase(1)
                        .minOfNumeric(1)
                        .noWhiteSpaces()
                        .required(),
    });
    const {error, succ} = shema.validate(req.body);
    if(error){
        res.status(403).json({ msg: error.details[0].message});
    } else {
        try{
            let data = await User.findByPk( req.params.id );
            data.name = req.body.name;
            data.role = req.body.role;
            data.email = req.body.email;
            data.watchlistId = req.body.watchlistId;
            await data.save();
            res.send(data);
        } catch(err){ 
            console.log(err);
            res.status(500).json({ error: "Greska", data: err });
        }
    }
});

