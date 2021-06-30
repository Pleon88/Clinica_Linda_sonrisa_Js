const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Insumos_OrdenPedido', {
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Insumos',
        key: 'id_insumos'
      }
    },
    id_ordenPedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orden_Pedidos',
        key: 'id_ordenPedido'
      }
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Insumos_OrdenPedido',
    schema: 'dbo',
    timestamps: false
  });
};
