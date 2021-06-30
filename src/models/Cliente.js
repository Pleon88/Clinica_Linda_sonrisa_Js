const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cliente', {
    Id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_cliente: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    AFP_cliente: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    finiquito_cliente: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    liq_sueldo_cliente: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    IdBoleta_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Cliente',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Cliente",
        unique: true,
        fields: [
          { name: "Id_cliente" },
        ]
      },
    ]
  });
};
