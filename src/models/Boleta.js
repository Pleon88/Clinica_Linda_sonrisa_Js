const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Boleta', {
    id_boleta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_presupuesto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Presupuesto',
        key: 'id_presupuesto'
      }
    },
    monto_boleta: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha_boleta: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Boleta',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Saldo",
        unique: true,
        fields: [
          { name: "id_boleta" },
        ]
      },
    ]
  });
};
