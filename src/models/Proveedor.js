const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Proveedor', {
    rut_proveedor: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    razon_social_prov: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    direccion_proveedor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_region: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_comuna: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Comuna',
        key: 'id_comuna'
      }
    },
    fono_proveedor: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email_proveedor: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Proveedor',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Proveedor",
        unique: true,
        fields: [
          { name: "rut_proveedor" },
        ]
      },
    ]
  });
};
