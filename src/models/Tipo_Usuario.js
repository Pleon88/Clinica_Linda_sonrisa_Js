const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tipo_Usuario', {
    idTipo_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Tipo_Usuario',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Usuario",
        unique: true,
        fields: [
          { name: "idTipo_usuario" },
        ]
      },
    ]
  });
};
