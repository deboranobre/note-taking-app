var express = require('express'),
  app = express(),
  path = require('path'),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Note = require('./api/models/noteModel'),
  bodyParser = require('body-parser');

  //For requiring `.jsx` files as Node modules
  require('node-jsx').install({extension: '.jsx'});
  var App=require('./app/App.jsx');
  var React=require('react');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/NoteTakingdb'); 

var db = mongoose.connection;

// When successfully connected
db.on('connected', function() {
    console.log('Mongo DB connection open for DB');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Render React on Server
// get the intended host and port number, use localhost and port 3000 if not provided
app.get('/',function(req,res){
    var markup=React.renderComponentToString(App());
    res.send('<!DOCTYPE html>'+markup);
});

var routes = require('./api/routes/noteRoutes');
routes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);