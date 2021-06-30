const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Servicio', {
    id_servicio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_servicio: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descrip_servicio: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    valor_servicio: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    status_servicio: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Servicio',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Diente",
        unique: true,
        fields: [
          { name: "id_servicio" },
        ]
      },
    ]
  });
};
