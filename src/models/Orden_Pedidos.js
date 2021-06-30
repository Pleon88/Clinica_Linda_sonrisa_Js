const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orden_Pedidos', {
    id_ordenPedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rut_proveedor: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'Proveedor',
        key: 'rut_proveedor'
      }
    },
    numero_oPedido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cantidad_ordenPedido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_actualizada: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status_ordenPedido: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Orden_Pedidos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Compra_Productos",
        unique: true,
        fields: [
          { name: "id_ordenPedido" },
        ]
      },
    ]
  });
};
