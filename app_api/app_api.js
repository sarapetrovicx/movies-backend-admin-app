const path = require("path");
const express = require("express");
const cors = require('cors');
const { sequelize } = require('./models');


const app = express();

var corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

// app.use(express.static(path.join(__dirname, 'static')));

const studentRoutes = require("./routes/user.js");
app.use("/api/users", studentRoutes);

const movieRoutes = require("./routes/movie.js");
app.use("/api/movies", movieRoutes);

const directorRoutes = require("./routes/director.js");
app.use("/api/directors", directorRoutes);

const genreRoutes = require("./routes/genre.js");
app.use("/api/genres", genreRoutes);

const watchlist = require("./routes/watchlist.js");
app.use("/api/watchlists", watchlist);

const moviedir = require("./routes/moviedirection.js");
app.use("/api/moviedirections", moviedir);

const moviegenre = require("./routes/moviegenre.js");
app.use("/api/moviegenres", moviegenre);

const moviewatchlist = require("./routes/moviewatchlist.js");
app.use("/api/moviewatchlists", moviewatchlist);

const rating = require("./routes/rating.js");
app.use("/api/ratings", rating);

const comment = require("./routes/comment.js");
app.use("/api/comments", comment);

app.listen({ port: 8080 }, async () => {
    await sequelize.authenticate();
    console.log("Started server on localhost:8080");
});