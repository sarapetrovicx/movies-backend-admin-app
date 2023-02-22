const express = require("express");
const { sequelize, Genre } = require("../models");
const Joi = require("joi");
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

        if(user.role === 'user') return res.status(403).json({ msg: "Admin and moderator only" });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get("/", async (req,res) => {
    try{
        const movies = await Genre.findAll();
        return res.json(movies);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post('/messages', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Messages.create({ body: req.body.body, userId: req.user.userId })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});

route.post("/", (req, res) => {
    const shema = Joi.object().keys({
        genre_name: Joi.string().trim().min(2).max(12).required(),
    });
    const {error, succ} = shema.validate(req.body);
    if(error){
        res.status(403).json({ msg: error.details[0].message});
    } else {
        Genre.create(req.body)
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    }
});

route.delete("/:id",  async (req,res) => {
    try{
        const task = await Genre.findByPk(req.params.id);
        task.destroy();
        return res.json( task.id );
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

const { Op } = require("sequelize");
route.get("/find/:q", async (req, res) => {
    try{
        let data = await Genre.findAll({
            where: {
                [Op.or]: {
                    genre_name: {
                        [Op.substring]: req.params.q
                    }
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
        let data = await Genre.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });

route.put("/edit/:id", async(req, res) => {
    try{
        let data = await Genre.findByPk( req.params.id );
        data.genre_name = req.body.genre_name;
        await data.save();
        res.send(data);
    } catch(err){ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});