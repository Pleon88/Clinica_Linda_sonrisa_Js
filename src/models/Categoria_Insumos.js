const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Categoria_Insumos', {
    id_categoria_Insumos: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoria_insumos: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    familia_insumos: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Categoria_Insumos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Categoria_Producto",
        unique: true,
        fields: [
          { name: "id_categoria_Insumos" },
        ]
      },
    ]
  });
};
