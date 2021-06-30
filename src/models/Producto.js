const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Producto', {
    Id_producto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    detalle_producto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_servicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Servicio',
        key: 'id_servicio'
      }
    },
    id_insumos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Insumos',
        key: 'id_insumos'
      }
    }
  }, {
    sequelize,
    tableName: 'Producto',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Producto_1",
        unique: true,
        fields: [
          { name: "Id_producto" },
        ]
      },
    ]
  });
};
