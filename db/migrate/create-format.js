"use strict"
module.exports = {
	up: function(migration, DataTypes, done) {
	migration.createTable("Formats", {
	id: {

allowNull: false,
autoIncrement: true,
primaryKey: true,
type: DataTypes.TNTEGER
},
name: {
	allowNull: false,
	type: DataTypes.STRING

}
	}
	}).done(done);
	},
	down: function(migration, DataTypes, done) {
    migration.dropTable("Formats").done(done);
  }
};