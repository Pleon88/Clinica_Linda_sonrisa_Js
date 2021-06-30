const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Producto_Presupuesto', {
    id_presupuesto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Presupuesto',
        key: 'id_presupuesto'
      }
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'Id_producto'
      }
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Producto_Presupuesto',
    schema: 'dbo',
    timestamps: false
  });
};
