"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Buyers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Buyers").done(done);
  }
};