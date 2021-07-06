const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cliente', {
    Id_cliente: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Usuario',
        key: 'run_usuario'
      }
    },
    AFP_cliente: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    finiquito_cliente: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    liq_sueldo_cliente: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IdBoleta_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true
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
