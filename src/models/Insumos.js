const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Insumos', {
    id_insumos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_categoria_insumos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      references: {
        model: 'Categoria_Insumos',
        key: 'id_categoria_Insumos'
      }
    },
    rut_proveedor_insumos: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha_venc_insumos: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    descrip_insumos: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    stock_insumos: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Insumos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Producto",
        unique: true,
        fields: [
          { name: "id_insumos" },
        ]
      },
    ]
  });
};
