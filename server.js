var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();
// This allows us to accept JSON bodies in POSTs and PUTs.
app.use(bodyParser.json());

// Serve files from public folder. That's where all of our HTML, CSS and Angular JS are.
app.use(express.static('public')); //this is telling it to use the public folder!

// Set up a connection pool with wich to access the database in all the
// operations below.
var pool = new pg.Pool({
    user: "postgres",
    password: "winter",
    host: "localhost",
    port: 5432,
    database: 'finalproject',
    ssl: false
});


app.get('/remedies', function(req, res) {
  var ailment = req.query.ailment;
  console.log(ailment);
  pool.query("select * from holistichealth where ailment=$1::text", [ ailment ]).then(function(result) {
      res.send(result.rows);
  }).catch(errorCallback(res));
});



// 1. in pgAdmin, build the right query. Use Stomach Pain and it should return 2 rows.
// 2. create an endpoint here, just like /rooms. Use url /remedies. use your query from above instead
//    of 'SELECT * FROM Rooms'.
//    - test it with Postman.
// 3. change the endpoint to let you specify which ailment.
// 4. start changing your Angular code to request this API endpoint. The url will simply be "/api/remedies".


app.put('/remedies/:id/userupvotes', function(req, res) {

    console.log("nailed it!");
    var id = req.params.id; //this gets ID part of URL
    var sql = "UPDATE holistichealth SET userupvotes = userupvotes + 1 WHERE id=$1::int";
    var values = [id];


    pool.query(sql, values).then(function() {
        //res.status(201); // 201 Created
        res.send("UPDATED");
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
