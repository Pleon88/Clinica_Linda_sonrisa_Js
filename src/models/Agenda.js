const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Agenda', {
    id_agenda: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario_agenda: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'run_usuario'
      }
    },
    fecha_agenda: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status_agenda: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Agenda',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Reserva",
        unique: true,
        fields: [
          { name: "id_agenda" },
        ]
      },
    ]
  });
};
