const express = require("express");
const { sequelize, MovieWatchList} = require("../models");
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
        const movies = await MovieWatchList.findAll();
        return res.json(movies);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/",  async (req,res) => {
    try{
        const novi = await MovieWatchList.create(req.body);
        return res.json(novi);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/:id",  async (req,res) => {
    try{
        const task = await MovieWatchList.findByPk(req.params.id);
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
        let data = await MovieWatchList.findAll({
            where: {
                [Op.or]: {
                    id: {
                        [Op.substring]: req.params.q
                    },
                    watchlistId: {
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
        let data = await MovieWatchList.findByPk(req.params.id);
        return res.json(data);
    } catch{ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.put("/edit/:id", async(req, res) => {
    try{
        let data = await MovieWatchList.findByPk( req.params.id );
        data.movieId = req.body.movieId;
        data.watchlistId = req.body.watchlistId;
        await data.save();
        res.send(data);
    } catch(err){ 
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});