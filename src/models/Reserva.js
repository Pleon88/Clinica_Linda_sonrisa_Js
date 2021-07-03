const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reserva', {
    id_agenda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Agenda',
        key: 'id_agenda'
      }
    },
    status_reserva: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    horario_reserva: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Reserva',
    schema: 'dbo',
    timestamps: false
  });
};
