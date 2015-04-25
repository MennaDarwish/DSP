"use strict"
module.exports = {
	up: function(migration, DataTypes, done) {
	migration.createTable("Impression", {
	id: {

allowNull: false,
autoIncrement: true,
primaryKey: true,
type: DataTypes.INTEGER
},

creativeID: {
	allowNull: false,
	type: DataTypes.INTEGER,
	references: 'creative',
	referenceskey: 'id'
},
publisherID: {
	allowNull: false,
	type: DataTypes.INTEGER
},
userID: {
	allowNull: false,
	type:DataTypes.INTEGER
},
longitude: {
	allowNull: false,
	type: DataTypes.INTEGER
},
latitude: {
	allowNull: false,
	type: DataTypes.INTEGER
},
price: {
	allowNull: false,
	type: DataTypes.INTEGER
}
	}).done(done);
	},
	down: function(migration, DataTypes, done) {
	migration.dropTable("Impression").done(done);
  }
};