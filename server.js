var express = require('express'); //need to require these for this app to work. Body-parser allows us to return JSON data, express is node, pg is for the DB.
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


app.get('/remedies', function(req, res) { //creates an endpoint matching requests to /remedies
  var ailment = req.query.ailment; //sets ailment to the DB query of ailment dependent on what you click (clicking takes you to a query string result)
  console.log(ailment);
  pool.query("select * from holistichealth where ailment=$1::text ORDER BY userupvotes DESC", [ ailment ]).then(function(result) {
      res.send(result.rows); //above queries the pool with statement in (), sets the item in the array to "ailment", and returns the results of the rows associated with that ailment.
  }).catch(errorCallback(res));
}); //the where ailment=$1::text, [ailment] statement is setting the query to look for ailment in the DB



// 1. in pgAdmin, build the right query. Use Stomach Pain and it should return 2 rows.
// 2. create an endpoint here, just like /rooms. Use url /remedies. use your query from above instead
//    of 'SELECT * FROM Rooms'.
//    - test it with Postman.
// 3. change the endpoint to let you specify which ailment.
// 4. start changing your Angular code to request this endpoint. The url will simply be "/remedies".


app.put('/remedies/:id/userupvotes', function(req, res) { //method to update data in column with id "userupvotes"

    console.log("nailed it!");
    var id = req.params.id; //this gets ID part of URL
    var sql = "UPDATE holistichealth SET userupvotes = userupvotes + 1 WHERE id=$1::int"; //updates column userupvotes in DB by adding 1.
    var values = [id]; //sets value for query parameter below to ID in the SQL DB


    pool.query(sql, values).then(function() { //queries DB pool for that ID and sends result statement.
        //res.status(201); // 201 Created
        res.send("UPDATED"); //just sends this result to display in PGAdmin
    }).catch(errorCallback(res));
});

function errorCallback(res) {
    return function(err) {
        console.log(err);
        res.status(500); // 500 Server Error
        res.send("ERROR!");
    }
}

var port = process.env.PORT || 5000; //sets localhost port to 5000; the app listens on 5000 and console logs the statement to terminal.
app.listen(port, function () {
  console.log('JSON Server is running on ' + port);
});
