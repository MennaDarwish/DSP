var express = require('express');
var app = express();

var placementsRoutes = require('./routes/placements');
app.use('/placements', placementsRoutes);


app.listen(4000, function(){
   console.log('Listening on port 4000');
 });
