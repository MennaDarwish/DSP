var express = require('express');
var app = express();
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
secret: process.env.SESSION_SECRET || 'secret',
resave: false,
saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var placementsRoutes = require('./routes/placements');
app.use('/placements', placementsRoutes);



var AvertisersRoute = require('./routes/advertisers');
app.use('/advertisers', AvertisersRoute);

app.listen(4000, function(){
   console.log('Listening on port 4000');
});

module.exports = app;
