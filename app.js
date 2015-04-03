var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

var placementsRoutes = require('./routes/placements');
app.use('/placements', placementsRoutes);

var AvertisersRoute = require('./routes/advertisers');
app.use('/Advertisers', AvertisersRoute);


app.listen(4000, function(){
   console.log('Listening on port 4000');
 });
