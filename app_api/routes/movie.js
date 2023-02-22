const express = require("express");
const { sequelize, Movie } = require("../models");
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
        const movies = await Movie.findAll();
        return res.json(movies);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async(req, res) => {
    console.log(req.body)
    const shema = Joi.object().keys({
        title: Joi.string().trim().min(2).max(30).required(),
        year: Joi.number().integer().min(1878).max(2022).default(2022).required(),
        duration: Joi.string().trim().min(2).max(8).required(),
        language:  Joi.string().trim().required(),
        movielistId: Joi.number().integer().default(1),
        trailer: Joi.string().trim().required(),
    });
    const {error, succ} = shema.validate(req.body);
    if(error){
        res.status(403).json({ msg: error.details[0].message});
    } else {
        Movie.create(req.body)
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    }
});

route.get("/:id", async (req, res) => {
    try{
        let movie = await Movie.findByPk(req.params.id);
        return res.json(movie);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });

route.delete("/:id",  async (req,res) => {
    try{
        const task = await Movie.findByPk(req.params.id);
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
        let data = await Movie.findAll({
            where: {
                [Op.or]: {
                    id: {
                        [Op.substring]: req.params.q
                    },
                    title: {
                        [Op.substring]: req.params.q
                    },
                    year: {
                        [Op.substring]: req.params.q
                    },
                    duration: {
                        [Op.substring]: req.params.q
                    },
                    language: {
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

 route.put("/edit/:id", async(req, res) => {
    const shema = Joi.object().keys({
        title: Joi.string().trim().min(2).max(30).required(),
        year: Joi.number().integer().min(1878).max(2022).default(2022).required(),
        duration: Joi.string().trim().min(2).max(8).required(),
        language:  Joi.string().trim().required(),
        movielistId: Joi.number().integer().default(1),
        trailer: Joi.string().trim().required(),
    });
    const {error, succ} = shema.validate(req.body);
    if(error){
        res.status(422).json({
            status: 'error',
            message: error.details[0].message,
            data: error
          });
    } else {
        try{
        let data = await Movie.findByPk( req.params.id );
        data.title = req.body.title;
        data.year = req.body.year;
        data.duration = req.body.duration;
        data.language = req.body.language;
        data.trailer = req.body.trailer;
        data.movielistId = req.body.movielistId;
        await data.save();
        res.send(data);
        }catch(err){
           console.log(err);
           res.status(500).json({error: "Greska",data: err});
        }
    }
    // try{
    //     let data = await Movie.findByPk( req.params.id );
    //     data.title = req.body.title;
    //     data.year = req.body.year;
    //     data.duration = req.body.duration;
    //     data.language = req.body.language;
    //     data.trailer = req.body.trailer;
    //     data.movielistId = req.body.movielistId;
    //     await data.save();
    //     res.send(data);
    // } catch(err){ 
    //     console.log(err);
    //     res.status(500).json({ error: "Greska", data: err });
    // }
});