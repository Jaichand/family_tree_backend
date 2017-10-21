var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 8081;
var cors = require('cors');
var config = require('./config');
var routes = require('./routes/routes.js');
var mongoUrl = config.mongo.url + config.mongo.dbName;

console.log("mongoUrl here", mongoUrl);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
mongoose.connect(mongoUrl);
app.get('/', function(req, res) {
  console.log("Hey, I am here");
});

app.use('/api', routes);
app.listen(port);
console.log('Magic happens at http://localhost:' + port);