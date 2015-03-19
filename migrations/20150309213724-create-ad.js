"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Ads", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      buyerId: {
        type: DataTypes.INTEGER,
        references: 'Buyers',
        referencesKey: 'id',
        allowNull: false
      },
      length: {
        type: DataTypes.FLOAT
      },
      width: {
        type: DataTypes.FLOAT
      },
      tags: {
        type: DataTypes.STRING
      },
      imageURL: {
        type: DataTypes.STRING
      },
      imageRedirectUrl: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.FLOAT
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
    migration.dropTable("Ads").done(done);
  }
};