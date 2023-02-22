const express = require("express");
const { sequelize, Rating} = require("../models");
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
        const movies = await Rating.findAll();
        return res.json(movies);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", (req, res) => {
    console.log(req.body)
    const shema = Joi.object().keys({
        rate: Joi.number().min(1).max(10).required(),
        userId: Joi.number().integer().required(),
        movieId: Joi.number().integer().required()
    });
    const {error, succ} = shema.validate(req.body);
    if(error){
        res.status(403).json({ msg: error.details[0].message});
    } else {
        Rating.create(req.body)
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    }
});

route.delete("/:id",  async (req,res) => {
    try{
        const task = await Rating.findByPk(req.params.id);
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
        let data = await Rating.findAll({
            where: {
                [Op.or]: {
                    rate: {
                        [Op.substring]: req.params.q
                    },
                    userId: {
                        [Op.substring]: req.params.q
                    },
                    movieId: {
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
        let data = await Rating.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.put("/edit/:id", async(req, res) => {
    const shema = Joi.object().keys({
        rate: Joi.number().min(1).max(10).required(),
        userId: Joi.number().integer().required(),
        movieId: Joi.number().integer().required()
    });
    const {error, succ} = shema.validate(req.body);
    if(error){
        res.status(403).json({ msg: error.details[0].message});
    } else {
        try{
            let data = await Rating.findByPk( req.params.id );
            data.rate = req.body.rate;
            data.movieId = req.body.movieId;
            data.userId = req.body.userId;
            await data.save();
            res.send(data);
        } catch(err){ 
            console.log(err);
            res.status(500).json({ error: "Greska", data: err });
        }
    }
});