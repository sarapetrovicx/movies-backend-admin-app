const path = require("path");
const express = require("express");
// const { sequelize} = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}

function allowed(req, res, next){
    const {role} = req.user;
    if(role === 'user'){
        return res.status(403).send("Forbidden: Admin and moderator only!");
    }
    next()
}

app.get('/', authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get("/admin/users", authToken, (req,res) => {
    const {role} = req.user;
    if(role !== 'admin'){
        return res.status(403).send("Forbidden: Admin only!");
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/users.html'));
});

app.get("/admin/movies", authToken, allowed, (req,res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin/movies.html'));
});

app.get("/admin/genres", authToken, allowed, (req,res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin/genres.html'));
});

app.get("/admin/directors", authToken, allowed, (req,res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin/directors.html'));
});

app.get("/admin/movielists", authToken, allowed, (req,res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin/directors.html'));
});

app.get("/admin/moviedirections", authToken, allowed, (req,res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin/moviedirections.html'));
});

app.get("/admin/watchlists", authToken, allowed, (req,res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin/watchlists.html'));
});

app.get('/admin/moviegenres', authToken, allowed, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin/moviegenres.html'));
});

app.get('/admin/moviewatchlists', authToken, allowed, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin/moviewatchlists.html'));
});

app.get('/admin/ratings', authToken, allowed, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin/ratings.html'));
});

app.get('/admin/comments', authToken, allowed, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin/comments.html'));
});

// app.get('/register', (req, res) => {
//     res.sendFile('register.html', { root: './static' });
// });

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'login.html'));
});



app.listen({ port: 8000 }, async () => {
    console.log("Started server on localhost:8000");
});


// npm install express
// npm install sequelize mariadb
// npm install --save-dev sequelize-cli
// npx sequelize init


// npx sequelize model:generate --name User --attributes name:string,email:string
// npx sequelize model:generate --name Message --attributes content:string   
// npx sequelize seed:generate --name create-users


// npx sequelize-cli db:migrate:undo:all
// npx sequelize-cli db:migrate
// npx sequelize-cli db:seed:all