const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Region', {
    id_region: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_region: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Region',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Región",
        unique: true,
        fields: [
          { name: "id_region" },
        ]
      },
    ]
  });
};
