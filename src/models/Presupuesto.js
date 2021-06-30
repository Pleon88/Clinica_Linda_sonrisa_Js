const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Presupuesto', {
    id_presupuesto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_presupuesto: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_cliente_presupuesto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cliente',
        key: 'Id_cliente'
      }
    },
    fecha_actualizacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Presupuesto',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Presupuesto",
        unique: true,
        fields: [
          { name: "id_presupuesto" },
        ]
      },
    ]
  });
};
