const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comuna', {
    id_comuna: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_comuna: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    idregion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Region',
        key: 'idregion'
      }
    }
  }, {
    sequelize,
    tableName: 'Comuna',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Comuna",
        unique: true,
        fields: [
          { name: "id_comuna" },
        ]
      },
    ]
  });
};
