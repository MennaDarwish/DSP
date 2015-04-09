var express = require('express');
var app = express();

var placementsRoutes = require('./routes/placements');
app.use('/placements', placementsRoutes);

module.exports = app;
