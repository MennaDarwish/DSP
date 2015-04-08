"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("GeoTargets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      radius: {
        type: DataTypes.INTEGER
      },
      campaignId: {
        type: DataTypes.INTEGER,
        references: 'Campaigns',
        referencesKey: 'id',
        allowNull: false
      },
      country: {
        type: DataTypes.STRING
      },
      latitude: {
        type: DataTypes.FLOAT
      },
      longitude: {
        type: DataTypes.FLOAT
      },
      city: {
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
    migration.dropTable("GeoTargets").done(done);
  }
};
