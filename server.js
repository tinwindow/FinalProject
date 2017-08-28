/*var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();
// This allows us to accept JSON bodies in POSTs and PUTs.
app.use(bodyParser.json());

// Set up a connection pool with wich to access the database in all the
// operations below.
var pool = new pg.Pool({
    user: "postgres",
    password: "****",
    host: "localhost",
    port: 5432,
    database: "postgres",
    ssl: false
});

// GET /rooms - responds with an array of all rooms in the database.
app.get('/rooms', function(req, res) {
    pool.query("SELECT * FROM Rooms").then(function(result) {
        res.send(result.rows);
    }).catch(errorCallback(res));
});

// GET /rooms/{ID} - responds with the one matching room from the database.
app.get('/rooms/:id', function(req, res) {
    var id = req.params.id; // <-- This gets the :id part of the URL
    pool.query("SELECT * FROM Rooms WHERE id = $1::int", [id]).then(function(result) {
        if (result.rowCount === 0) {
            res.status(404); // 404 Not Found
            res.send("NOT FOUND");
        } else {
            // Return the first result. There should only be one.
            res.send(result.rows[0]);
        }
    }).catch(errorCallback(res));
});

function errorCallback(res) {
    return function(err) {
        console.log(err);
        res.status(500); // 500 Server Error
        res.send("ERROR!");
    }
}

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('JSON Server is running on ' + port);
});
