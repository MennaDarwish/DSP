"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Creatives", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      campaignId: {
        type: DataTypes.INTEGER,
        references: 'Campaigns',
        referencesKey: 'id',
        allowNull: false
      },
      height: {
        type: DataTypes.INTEGER
      },
      width: {
        type: DataTypes.INTEGER
      },
      tags: {
        type: DataTypes.STRING
      },
      imageURL: {
        type: DataTypes.STRING
      },
      redirectUrl: {
        type: DataTypes.STRING
      },
      microUSD: {
        type: DataTypes.INTEGER
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
    migration.dropTable("Creatives").done(done);
  }
};
