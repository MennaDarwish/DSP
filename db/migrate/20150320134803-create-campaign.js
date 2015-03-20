"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Campaigns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      budget: {
        type: DataTypes.INTEGER
      },
      tags: {
        type: DataTypes.STRING
      },
      advertiserId: {
        type: DataTypes.INTEGER,
        references: 'Advertisers',
        referencesKey: 'id',
        allowNull: false
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
    migration.dropTable("Campaigns").done(done);
  }
};
